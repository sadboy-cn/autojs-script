const appSimpleName = "钉钉";
//打卡类型（上班打卡/下班打卡）
const punchType = "上班打卡";
var common = {};
common.ui = {
  windows:null
}
common.data = {
  "lighting":true,
  "lockCode":"",
  "ddAccount":"",
  "ddCode":"",
  "ddCom":"",
  "noticeSwitch":false,
  "serverKey":"",
  "timeH":8,
  "timeM":0,
  "timeS":0,
  "timeLost":0,
  "debug":true
}
common.log = function (info) {
  ui.run(function() {
    window.logText.setText(info);
    setTimeout(() => {
         window.setPosition((device.width - window.width+80) / 2, 0);
    }, 50);
    console.log(info);
  });
};
common.getTime = function (r) {
  var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    var hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    };
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    };
    return year +"-"+ month +"-"+ day +" "+ hour +":"+ minute+":"+ "0";
};
var mainThread;
common.run=function(){
  common.log("进入定时任务");
  mainThread = threads.start(timeCycle);
  //var img = captureScreen();
  //images.saveImage(img, "/sdcard/"+J+++".png");
  //img.recycle();
  //common.log("程序运行完成,停止所有线程");
  //threads.shutDownAll();
}

function timeCycle() {
  threads.start(function(){
      //实际随机分钟数
      var realTimeLost = random(0, common.data.timeLost);
      //TODO 可能存在8:90:30这种bug
      common.log("随机"+realTimeLost+"分钟,打卡："+common.data.timeH+":"+(common.data.timeM+realTimeLost)+":"+common.data.timeS);
      sleep(3000);
      while (true) {
          var nowH = new Date().getHours();
          var nowM = new Date().getMinutes();
          var nowS = new Date().getSeconds();
          //TODO 没必要循环这么快，分钟相同其实就可以了
          if ( (nowH%1 == common.data.timeH && nowM == common.data.timeM+realTimeLost && nowS == common.data.timeS)) {
              mainThread.interrupt();
              common.log("到达指定时间，停止主任务")
              timeTask();
              break;
          }
      }
  })
}

function timeTask() {
  common.log("钉钉打卡正在执行...");
  try{
      workMain();
   }catch(e){
      console.error("运行出错1:"+e);
      console.log(e.stack);
      if(!e.javaException instanceof java.lang.InterruptedException)  
         console.error("运行出错:"+e.toString());
   }finally{
     
   }
  console.log("定时任务执行完毕，回到主任务");
  mainThread = threads.start(timeCycle);
}

function workMain(){
  console.log("开始钉钉打卡");
  //1、检测网络状态
  internetCheck();
  //2、检测GPS状态
  gpsCheck();
  //3、执行钉钉打卡
  gotoDingDing();
  sleep(5000);
}

//判断网络情况，如果没有网络，结束脚本运行
function internetCheck() {
  common.log("1、开始检查网络");
  var url = "m.baidu.com";
  var res = http.get(url);
  if (res.statusCode != 200) {
      console.error("网络不可用，无法打卡");
      exit();
  } else {
      console.log("检查网络成功");
  }
}

//判断GPS是否可用，如果不可用，结束脚本运行
function gpsCheck() {
  common.log("2、开始检查GPS");
  importClass(android.location.LocationManager);
  importClass(android.content.Context);
  var locationManager = context.getSystemService(Context.LOCATION_SERVICE);
  if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
      console.error("GPS不可用，无法打卡");
      exit();
  } else {
      console.log("检查GPS成功");
  }
}

function gotoDingDing(){
  common.log("3、我要去打卡");
  //3.1 判断是否设置屏幕常亮，屏幕常亮将直接进入下一步，否则点亮屏幕，上滑解锁
  //执行完成将进入home页
  if(!common.data.lighting){
    //3.1.1 点亮屏幕
    common.log("3.1.1、点亮屏幕");
    device.wakeUp();
    sleep(1000);
    if (!device.isScreenOn()) {
      throw "点亮屏幕失败";
    }

    //保持屏幕常亮
    device.keepScreenOn(30 * 60 * 1000);

    //3.1.2 上滑解锁swipe(a,b,c,d,e)=>从(a,b)滑动到(c,d)，使用e毫秒
    common.log("3.1.2、上滑解锁");
    swipe(device.width/2, device.height*9/10, device.width/2, device.height*1/10, 200);

    var lockCode = common.data.lockCode;
    if(lockCode != null && lockCode != ""){
      //3.1.2 上滑解锁swipe(a,b,c,d,e)=>从(a,b)滑动到(c,d)，使用e毫秒
      common.log("3.1.3、密码解锁*"+lockCode+"*");
      var pwdChar = (lockCode+"").split('');
      var five = desc("5").findOne(10000);
      if(five != null){
        pwdChar.forEach(function(temp) {
          desc(temp).findOne().click();
        });
      }else{
        console.log("未找到解锁键盘，脚本判断为已解锁");
      }
      
    }
    sleep(500);
    home();
    sleep(500);
    home();
  }else{
    home();
    sleep(500);
    home();
  }

  common.log("4.1、方式一打开"+appSimpleName);
  launchApp(appSimpleName);
  sleep(10 * 1000);
  //TODO 优化等待时间，优化方式二打开应用

  if (id("btn_next").exists()) {
    console.log("准备登录钉钉");
    loginDD(common.data.ddAccount,common.data.ddCode);
  }

  common.log("5、成功进入"+appSimpleName+",休息3s");
  sleep(3000);

  //点击忽略更新（如果有）
  if (click("暂不更新")) {
    console.log("点击暂不更新,休息1s");
    sleep(1000);
  }

  //TODO 可以做下钉钉内部的容错，比如已经在打卡页面等

  //点击工作台
  var ddCom = common.data.ddCom;
  common.log("6、点击工作台"+ddCom+",等待考勤打卡10s");
  click(ddCom);

  var clock = text("考勤打卡").findOne(10000);
  if(clock == null){
    throw "十秒未找到考勤打卡，未知错误";
  }

  //点击考勤打卡
  clock.click();
  common.log("7、点击考勤打卡,等待统计10s");
  var statistics = text("统计").findOne(10000);
  if(statistics == null){
    throw "十秒未找到统计，未知错误";
  }

  //防止统计出来了，打卡页面还未加载出来
  sleep(5000);

  //判断是否休息日，休息日调试时跳过即可
  if(!common.data.debug){
    if (className("android.view.View").text("今日休息").exists()) {
      throw "今日休息，跳过打卡";
    }
  }

  //TODO 如果需要通知，打卡前截图，调试也需要截图
  if(common.data.debug){
    common.log("调试模式,跳过打卡,休息3s");
  }else{
    common.log("7、查找"+punchType+",等待10s");
    if(text(punchType).findOne(10000)){
      common.log("8、点击"+punchType+",点击后等待10s");
      click(punchType);
      sleep(10 * 1000);
    }else{
      //TODO 需要考虑外勤打卡
      throw "十秒未找到"+punchType+"，未知错误";
    }
  }

  //TODO 只有开启通知才需要统计
 
  //点击统计，查看统计结果
  click("统计");//此处不能使用statistics.click();大概是按钮clickable=false导致
  common.log("7、点击统计，查找四，等待10s");

  var four = text("四").findOne(10000);
  if(four == null){
    throw "十秒未找到四，未知错误";
  }else{
    console.log("找到四");
  }

  //返回上一页，为下一次做准备
  var times = 3;
  my = text("我的").findOne(5000);
  while(my == null && times-- > 0){
    back();
    sleep(1000);
    my = text("我的").findOne(5000);
  }
  //防止下次找不到工作台，也可以再判断一下工作台能否找到
  if(my != null){
    common.log("8、回到‘我的’");
    click("我的");
  }

  //3次返回主页，这是没事干，做着好玩
  home();
  sleep(1000);
  home();
  sleep(1000);
  home();
  common.log("9、回到‘Home页’");

  //关闭屏幕常亮
  console.log("关闭屏幕常亮");
  device.cancelKeepingAwake();
  common.log("10、打卡完成");
}

/**
 * 登录钉钉账号
 * @param {*} ddAccount 钉钉账号
 * @param {*} ddLoginCode 钉钉密码
 */
function loginDD(ddAccount,ddLoginCode){
  //输入手机号
  id("et_phone_input").findOne().setText(ddAccount+"");
  //输入密码
  id("et_pwd_login").findOne().setText(ddLoginCode+"");
  //点击协议
  id("cb_privacy").findOne().click();
  //点击登录
  id("btn_next").findOne().click();
  sleep(6 * 1000);

  //十秒钟去查找“我的”，作为登陆依据
  var my = text("我的").findOne(10000);
  if(my == null){//大概率登录失败
    //获取弹窗消息
    var msg = id("message").findOne(8000);
    if(msg != null){
      throw "登录异常："+msg.text();
    }
    throw "十秒未进入系统，未登录异常，未知错误";
  }
}

module.exports = common;