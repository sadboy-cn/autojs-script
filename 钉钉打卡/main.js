"ui";

var common= require('common.js');

 /**
  * 全局参数配置-开始
  */
 //本地数据存储数据库名称
 const localDbName = "wx@sadboy.cn:dddk";
 const appName = "钉钉打卡"+app.versionName;
 var showLog =function(info){
         common.log(info);
     };
 /**
 * 全局参数配置-结束
 */
var window = null;
var hasScreenCapturePower = false;
threads.start(function () {
    window = floaty.window(
        <frame gravity="center" >
            <text id="logText" textSize="13sp" textColor="#f44336" text=""/>
        </frame>
    );
    window.exitOnClose();
    common.ui.window = window;
    showLog("悬浮日志")
});
//输出指定日志文件
console.setGlobalLogConfig({
    file: "/sdcard/auto_daka_log.txt",
});

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar bg="#FF5c50e6" id="toolbar" title="{{appName}}" paddingTop="2dp" h="auto" >
                </toolbar>
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                {/* 第一个Frame */}
                <frame>
                    <scroll>
                        <vertical gravity="center">
                            {/* <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="14sp" text="今日头条极速版" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="自动阅读、领金币、宝箱" />
                                </vertical>
                                <checkbox id="toutiao" marginLeft="4" marginRight="6" checked="true" />
                            </horizontal>
 
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#00FFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" textColor="#222222" textSize="14sp" text="抖音短视频" />
                                    <text w="auto" textColor="#999999" textSize="12sp" text="滑动、关注、点赞、评论，自动化一体" />
                                </vertical> 
                                <checkbox id="douyin" marginLeft="4" marginRight="6" checked="false" />
                            </horizontal> */}
 
                            <horizontal gravity="right">
                                <button style="Widget.AppCompat.Button.Colored"  id="wool" text="启动" padding="12dp" w="auto" />
                                <button style="Widget.AppCompat.Button.Colored"  id="close" text="关闭线程" />
                            </horizontal>
                        </vertical>
                    </scroll>
                </frame>
                {/* 第二个Frame */}
                <frame>
                    <scroll>
                        <vertical>
                            
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#4F4F4F" h="*" w="10"  ></View>
                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                <text w="auto" textColor="#222222" textSize="14sp" text="开启无障碍服务" />
                                <Switch id="autoService"  checked="{{auto.service != null}}"  padding="8 8 8 8" />
                            </horizontal>
 
                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#4F4F4F" h="*" w="10"  ></View>
                                <text w="auto" padding="8 8 8 8" textColor="#222222" textSize="14sp" text="是否调试模式" />
                                <Switch id='switchIsShowConsole'  padding="8 8 8 8"  />
                            </horizontal>

                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <card w="*" h="auto" margin="10 8" cardCornerRadius="6dp"
                                        cardElevation="2dp" gravity="center">  
                                    <linear>
                                        <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                            <checkbox id="lighting" marginLeft="4" marginRight="6" checked="false" text="屏幕常亮模式"/>
                                        </horizontal>
                                        <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                            <text w="auto"  padding="8 8 8 8" textColor="#222222" textSize="14sp" text="锁屏密码:" />
                                            <input id="lockCode" text=""  hint="屏幕常亮模式不生效"  textSize="13sp"  inputType="text" />
                                        </horizontal>
                                    </linear>                        
                                </card>
                            </horizontal>

                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <card w="*" h="auto" margin="10 8" cardCornerRadius="6dp"
                                        cardElevation="2dp" gravity="center">  
                                    <linear>
                                        <vertical>
                                            <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                                <text w="auto" textColor="#222222" textSize="14sp" text="钉钉账号:" />
                                                <input id="ddAccount" text=""  hint="钉钉手机号"  textSize="13sp"  inputType="number" />
                                            </horizontal>
                                            <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                                <text w="auto" textColor="#222222" textSize="14sp" text="钉钉密码:" />
                                                <input id="ddCode" text=""  hint="钉钉登录密码"  textSize="13sp"  inputType="text" />
                                            </horizontal>
                                            
                                        </vertical>
                                        <vertical>
                                            <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                                <text w="auto" textColor="#222222" textSize="14sp" text="公司名称:" />
                                                <input id="comName" text=""  hint="公司名称"  textSize="13sp"  inputType="text" w="*"/>
                                            </horizontal>
                                        </vertical>
                                    </linear>                        
                                </card>
                            </horizontal>

                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <card w="*" h="auto" margin="10 8" cardCornerRadius="6dp"
                                        cardElevation="2dp" gravity="center">  
                                    <vertical>
                                        <horizontal layout_gravity="center_vertical" layout_weight="1"> 
                                            <checkbox id="noticeSwitch" marginLeft="4" marginRight="0" checked="false" text="通知"/>
                                        </horizontal>
                                        <horizontal layout_gravity="center_vertical"> 
                                            <text  padding="8 8 8 8" w="auto" textColor="#222222" textSize="14sp" text="Server酱Key:" />
                                            <input id="serverKey" text="" margin="0 0 10 0"  hint="百度Server酱" w="*" textSize="13sp"  inputType="text" />
                                        </horizontal>
                                    </vertical>                        
                                </card>
                            </horizontal>

                            <horizontal gravity="center_vertical" padding="5 5">
                                <View bg="#4876FF" h="*" w="10"  ></View>
                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                <text w="auto" textColor="#222222" textSize="14sp" text="打卡时间:" />
                                <input id="timeH" textSize="15sp" textColor="black" textColor="gray" w="50" gravity="center" text="8"/>
                                <text textColor="black" textSize="15sp" text="时" />
                                <input id="timeM" textSize="15sp" textColor="black" textColor="gray" w="50" gravity="center"  text="0"/>
                                <text textColor="black" textSize="15sp" text="分" />
                                <input id="timeS" textSize="15sp" textColor="black" textColor="gray" w="50" gravity="center"  text="0"/>
                                <text textColor="black" textSize="15sp" text="秒" />
                                <text textColor="#0000FF" textSize="15sp" text="(24小时)" />
                            </horizontal>

                            <horizontal  gravity="center_vertical" padding="5 5" >
                                <View bg="#4876FF" h="*" w="10"  ></View>
                                <text padding="8 10 0 8" textColor="red" textSize="15sp" text="*" />
                                <text w="auto"  textColor="#222222" textSize="14sp" text="打卡随机延时:" />
                                <input id="timeLost" text="10"  hint="延时0~x分钟" w="50"  textSize="13sp"  inputType="number" />
                                <text textColor="#0000FF" textSize="15sp" text="分钟" />
                            </horizontal>
                  
                            <vertical>
                                <button style="Widget.AppCompat.Button.Colored" id="btnSaveWoolConfig" text="保存配置" padding="12dp" w="*" />
                                <button bg="#FF6A6A" color="#ffffff" radius="2" margin="5" height="40" id="btnCleanWoolConfig" text="清除所有配置" padding="12dp" w="*" />
                            </vertical>
                        </vertical>
                    </scroll>
                </frame>
                {/* 第三页*/}
                <frame>
                    <scroll>
                        <vertical>
 
                            <horizontal gravity="center_vertical" padding="5 5"  >
                                <View bg="#00BFFF" h="*" w="10"  ></View>
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text w="auto" color="#111111" size="16" text="1、需要启动无障碍服务。" />
                                    <text w="auto" color="#111111" size="16" text="2、允许app显示在其他应用的上层。" />
                                </vertical>
                            </horizontal>
                    
                        </vertical>
                    </scroll>
                </frame> 
 
            </viewpager>
        </vertical>
        {/* drawer */}
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" />
            <scroll>
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16"  src="{{icon}}" />
                        <text textColor="black" textSize="15sp" text="{{title}}" layout_gravity="center" />
                    </horizontal>
                </list>
            </scroll>
        </vertical>
    </drawer>
);

log('前台服务: ' + $settings.isEnabled('foreground_service'));

$settings.setEnabled('foreground_service', true);
 
//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "配置","说明"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
activity.setSupportActionBar(ui.toolbar);
 
 
 
// 用户勾选无障碍服务的选项时，跳转到页面让用户去开启 
//android.permission.SYSTEM_ALERT_WINDOW
ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
 
 
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
 
initializeRightMenu();
initializeData();
 
/**
 * 启动项目
 */
ui.wool.click(function () {
    var appArray = getAppList();
    var foreachTimes = ui.lockCode.getText();
    var serverKeyStr = ui.serverKey.getText();
    var screenSileTimes = ui.ddAccount.getText();
    var isShowConsole = ui.switchIsShowConsole.isChecked();
    var timesInterval = ui.ddCode.getText();
    showLog("点击开始按钮");
    var tipMessage;
    if(isShowConsole){
        tipMessage = "本次以调试模式启动,将每隔5分钟执行一次"
        + "确认执行吗？如果配置不正确请点击取消，前往配置页面进行参数修正！";
    }else{
        tipMessage = "本次以正常模式启动,"
        + "确认执行吗？如果配置不正确请点击取消，前往配置页面进行参数修正！";
    }
    confirm(tipMessage).then(value => {
        //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
        if (value) {
            threads.start(function () {
                //在新线程执行的代码
                auto.waitFor();
                if (!hasScreenCapturePower && !requestScreenCapture()) {
                    console.error("请求截图失败");
                    exit();
                }else{
                    hasScreenCapturePower = true;
                }
                showLog("即将跳转执行定时任务");
                common.data = textObj();
                // if(common.data.debug){
                //     //调试模式下一分钟执行
                //     common.data.timeM = new Date().getMinutes()+1;
                // }
                common.run();
            });
        } else {
 
        }
    });
});
 
 
 
 
/**
 * 关闭程序
 */
ui.close.click(function () {
    showLog("线程已经全部关闭！");
    threads.shutDownAll();
});
ui.btnSaveWoolConfig.click(function () {
    var woolStorage = storages.create(localDbName);//创建本地存储
    woolStorage.put("foreachTimes", "" + ui.lockCode.getText() + "");
    woolStorage.put("serverKeyStr", "" + ui.serverKey.getText() + "");
    woolStorage.put("timeHStr", "" + ui.timeH.getText() + "");
    woolStorage.put("timeMStr", "" + ui.timeM.getText() + "");
    woolStorage.put("timeSStr", "" + ui.timeS.getText() + "");
    woolStorage.put("timeLostStr", "" + ui.timeLost.getText() + "");
    woolStorage.put("screenSileTimes", "" + ui.ddAccount.getText() + "");
    woolStorage.put("isShowConsole", "" + ui.switchIsShowConsole.isChecked() + "");
    woolStorage.put("isLighting", "" + ui.lighting.isChecked() + "");
    woolStorage.put("isNoticeSwitch", "" + ui.noticeSwitch.isChecked() + "");
    woolStorage.put("timesInterval", "" + ui.ddCode.getText() + "");
    woolStorage.put("comNameStr", "" + ui.comName.getText() + "");
    toastLog("配置保存成功！");
});

ui.btnCleanWoolConfig.click(function(){
    var tipMessage = "本次将清除数据库"+localDbName+"数据，确认执行吗？如果确认，退出程序，页面上的数据将消失！";
    confirm(tipMessage).then(value => {
        //当点击确定后会执行这里, value为true或false, 表示点击"确定"或"取消"
        if (value) {
            storages.remove(localDbName);
        } else {
            toast("取消")
        }
    });
});
 
ui.noticeSwitch.click(function(){
    var checked = ui.noticeSwitch.checked;
    var serverKey = ui.serverKey.getText();
    if(checked && (serverKey == null || serverKey == "")){
        toast("请先输入serverKey");
        ui.noticeSwitch.checked = false;
    }
});
 
function initializeRightMenu() {
    ui.menu.setDataSource([
        { title: "更新日志",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8klEQVRYR82XT2sTQRjGn3cTaG8mG28eqrATEQ8NePIiFRFURCoigohWVOxORNtP0PQTmKKZHEQoRQQtUpQigmjrBxDqRbGzYj140kziLaXpjszalDSm+bOxxDkF8s7z/N5535nZIfR4UI/90RTAFvJpN4Da1zPFW8n5ZhoNAezc5wzIugngdjcAAE4S4UjBZc52Oo0BhPyuONvTpXkwfff9L0ltrY8XeNJtpPcXwMayzyrOZv8FgNGIC7lQ5OxozwBsId8ozo71EGD5teLJ410BxPKf9qLcXwpE+suxkntgpSoYyy2nQLRri8Fq9ENpfF8Qb+flK+WyE10BJIRc1KABQBvRlOJss39sIZcADNYZjCvOsgGAkC8VZ6dCAZjsLKIrAMbqBLIW4flPly22alZbePOKO6dDASSEN6yh5wB881ejKSNi9VWM6SA0JlWaZVoBJIR8UeDsTCiAjSXUBLwrcDb0p6ZeFlrf8VejcVPnViWIC2+uyJ2zoQDsnMyAMBFM1nqMNK1oC9MAYiCaUq4zZsoUtShWa1ApR5c2m1B4zxR3zoUCiN39Gov2V1K+DkwHNkR+EWhkndaWanfDdqWw83JWuex8KIDqJFssT4OsEnxdAmFYcRb0Q7UkWustuyBCmKw2qJ2TT1SaXegKoFmjmTIRIegPM3xCKQJkNwHy3mPlOhd3DKDlLsjLRwWXXQoFkMgtj2jLHECdDb8cnao2YVzImSJnl0MB2EKaI7djANL6aiGdNI0L0z+KJ0dCAXSWd+NoOy8fKpdd6x2A8B4o7twIBWALaS6frTdde8tScxl1AdDolGvHv+4kDL8C7Zi1irG7KUEr8Xb+j+fk+2KaHQrVA+0YNIsxH6SkdR+IDsPCQTXKPtbG7+hnefC+AKDS+zOxe3LIsvwh87s1QF5OQGO07YeJBU0+VXzQGpFfIdBawXXeGqNEXnrrFVy3IliIaGI/0o7XEqAaUM0gTBlqMzU69ZlXNf/vx2mYzDud8xtjzpswrqCXXwAAAABJRU5ErkJggg==" },
        { title: "检查更新",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADnUlEQVRYR+2WTWgcZRjHf890k6KoTQ8F6xcRRcXWj9DubKmXFLQoRCtCg1KwTYspFrzYmJ3RwzYHs7PRXvSgCW20wQ9owWDAQ6jS3NZMElqKGkKbUhE/etBCDqE2yTwy484yHbLZ2cS2F9/bzPs8//+f//O8z/sKN3nJTebnfwE1O5Ap6DOesl3gceAJgQWFCWBShG9Hs3KylrImFmDm9RDCC0BTFYLTKEOuLYeSCEkkwCxoDiUO+AfwO+AJrFe4K0Y46FryUjURVQVkHD2p8HQIpEKf4dE3aotve3ll8rrJM2gXpT3y+xvXkpalRCwpwCxoD8pbJYApPNrct6W4FKDZoy3i0Vt2RHjdzcrHlXIWFZA+rPfKPDtQPiwlXnItubOandF909FzwIPBP+ENTfH12EH5JY5xjYDNeW0SoVMImu3WcrDS6tpyohYBfklUGI/kzCoMGcr70fKVBfjHS5VPgLujRH7Nx7KyvxbyMDbt6CmB5miuwG8Ke11Lhv81B9ic12ZDOBUJPIrBd6tSDBfflL+WQx7mPJnThvrVNCO0IrwS/veUbeO2jAQCokoNYcf3WRlaCWml3IyjHQrv+fsKI2OWbJPSgMmVkj5yLTlwPchDzExe21XoDb6VLkk7+qXAyygzri1rrid5iG06OgPcDgyK6egU8BDwo2vJxhshIO3opMAjwLSYBb2M0oBSdG3ZeiMEmI76w2yL77rvwCDwInDRteT+WgXs2pW7Y9Utc40DR7rPJs01Hf0ZuA8Y9h3IojjAVUnRNNohPyUFamuzH/UMjgMbVLVroN+pegNuyWujJ/hlrw+aMJPX7SoEQ6GWPoiSBwNFtfPTfic4Ykut2HB6NpgDpqP+uX++lHh6wWDnRKdMVwKKkyucGDiab61CvFXgc6CxFNfjWpINBDz3ga7+c5YrEYBZFT7Do4jHmbF35Ey4FyefT60ZmWrMdlUiF+EeEZ5C2RvYXloLa6mf2C9z5bugqVvX1Rt8Eb37w2BJsSHsjd37bH9kB/N95rbH+HV9ebpWcz/cn/SUlnFbLgSli2elC3pAlNf8xgLqgqCIgFf32ccFdtYo4KrCDyJ85Wbl3ShnxQfJpl6tkxkerpvnStGW88stQcrg0tw05yf6ZG4xi6o+yRZLWk4TVuyRpIWLx8VFoHL4WH93R614y3JgsXIkHURxgSsS4IPt2ZNr0NTfDxw74lzzSk7qxIoFJCX6z3tgpcRh/j9lvlrSBRsylQAAAABJRU5ErkJggg==" },
        { title: "教程",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAD4ElEQVRYR+1YXWgcVRg9350UpQ91d5NspIhE3UmqghQS3QqKqaDQ6osgYhUK+mBxkpYWoXlRqNSH4oMVutm2YlX6WKWiD33og11FSJEGxAdLMhsLFtLuJp0NrURMM/fIXXZkMk3qTEeDlVy4cO/wfec797vn/swVhErmkDsgFp4RIG8qyS4A+VY1lnVTRaRGoG6qCL7DdYx6u+yrAVTm4IWMdcf8gIZ6NC1WmJ+YTrb8yyOA/4kAfQBOE6gJ2CSkiGltWXUsAErYQaBThJ1sDkLyAJ8DMEWo/Q3ngSO5I+5D0DgB4GEA3wBSJ/S0gqoTvEzhZYille/ntaCzmRRIlwAmMc8CuKh9bJ/daVfCRE1bug5X89fJGsCPKOr4gvLHr+3onYkaLtVff/Tc2jl9V68FeZnkXhFsJ3Ec1O9S1pxsOPf/FAcnsGkvTRSp8Dogb6wR6aq9WTAz+VeRXNn9AsBaz7G3JgGO2ubK7gmQWyHqZ88pPJYS6xSAOc+xX4yS/VUo718ZLJTSBGgvVd+m4n6A73lOzzupsEaqQxTu9Rz73ihZah+bl9JIkoCZkrtbKRzUGntmh+wPk/hGbc1CVxbOeI7dXFNBMTK4gawxjhssGGQQIDrwNFixyGbL7hkBYhEOAJcja5IRZ+AEKg3H3mxsE2U2DvhyU/ePSCqJDFbJJshAIhkYzcbFjuosKoM0WLEX2G1DNi7RsN1yu0EarFiZTRPgf70bmItUkJzg4pJ4gd3sUIhOT3gjT5rZjtJkj1Z6XEH6Z5zCWOJD4e+OyKXuEbeq2dRkV0KzweCisczMmG+xLzIrRlbpAQLtImrIXP5BXtJaNf8Q/lNkg4TcFjIIk6XSuwVy7JYW2ErI4GYxEm1dq2QTZGDZzGbLrqvI4SuDPScT4N1gmi27wwIcAPRbntP7QSqskcltInrEc+xcGEdy5YmjZsvwBnv3RQN0lKt9PtAn9NcD1m+iWKNGTc+3/TC7577ZsH1uxD0mgldJfSCK1f3phTuv/r6wkeBGIe8O/AhVb4Ocnh4sVBdjje+jqOcbjt2/iGy2XN0i4CmIfCb0vyLUUwSebL3OGNspAhMtp3sEKLTaPwKoCPS3GvK0QHaC/BIiLxA8pIgKRbZA8ASIDS2fCQJTpi2CB8HmK4wpZ0GMao2vlcVt5pEDwEueY3++iKzp5MqTrwF8BaB5nBgF9VmqtnOWssZmdnRfCjus+/hizpr/oyj0ixC1CcDjANYZgg2nZ1cIq5+QihDfa82xtjl/bGZ4w7UwVubw+W6lVRFQRShsAptYMC86S830ov/yNDpbCd9Vsv9Wlv8E0mP+P0I4oqkAAAAASUVORK5CYII=" },
        { title: "关于",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE3ElEQVRYR61Xa4hUZRh+3jOrK1G7M2fGtIug654xS1IqSIpCKKlMtCL3RyCx5YU940oKJmSQCxoUhOU232Sp+K/UH1mkGRiKGV0oumDFzhnTMipx58xgCO26c574zjmj42Vmzkrn38z3vO/7fO/9E0T8EluOtRuet4DkQoF0EEgBkgzEWRRgkEBePG+nnOWBwbW3/BNFtTQDJbP56RDpJfAUgPZm+PC8JMB7IPuLmfQvjWQaEkjk8huE0gugLVRyBsAXAhwmcYpi/K3/F3oTRTCB4D0QmQtibBVPYX+pJ/1iPRJ1CZjK2QVgkS8o8qlHbi6nhvaja8Zwoxu1bT1pxoaHngS4TIA7wxB95trp+68kd0UCpiocBzg5FFjq2tbWiK6/CJZQhWUCbglJDLp2evylei4jYKr8aUBSfmohNrNkd/x4NcarMglVeETAfcFvOeHanVNq9V1EwFT5w4DcpwGubTVN0NEQM5XDEL/bta2uqux5I2HCrQtuLvNKdufHUQyYbzm3soI59PBzudc6VE8moX69XVD5wdcv3FhNTJ+ALjWKfBlme+SYj88evbYirVruNt8wvT43M219PRKmcpYAeAfAGSFn6xINCChHEejR2e72dD4Y5eYaE+935hgxHLyAp+va6bA5XVmLmSscAPmAALmibdk+AVM5vwOY5AELy7b1YVQC120ZSI2pGKfP40V2uD2d3Y3k48pZYAAfAPjTta2bJJ49PsuQke8AlN1TQxPQ17jOL1VuKmeRAIsJDrh2ek1T8ruOjjUHWzXpNhHvbknmCitJvkHInpLd+XhTBf8DwFTOfgAPgVgtZtbZBsEzAqwr2tbLo9Xf/qZzhxBtjSrgUp1J5bxAYCOI7WIq5wiAe0EscTPWtqgEJuQK1w97XAXBKgFam1VArV4z6zwLge6un2sCOh4pwphfsqfujUIgofKbBaJ7+8wafJdrW7ujyR97VOB9BGBw1AT8IUW2VCqyJtaCQtWgERtz4+DyyX+NhgCJ01cdgnY10BGDcSzonPi2ZFt3RTHul30YAgKHrjoJE+q8G5t2wHpJSELpMlxBsh/gXtdOz496i4QqrBHw1aAFjy6Bq2UoZLfoYQIPP0EwPDJm3A1nlkxyo5Aws/m9EJnnYwUPuz3WJ4lcYQb/jf1RXjWlXFdHTSPyZGRKtRUf1QOFkOUlu/PtSASUcw5AS0BAdoDeOAF3Fu1pexrJJ9XAY4TxPsiv3Ex6djgNC+so3BA1mXQPOEeeqjVEcm0pkw5CUueLbzoeN1pH9PCaVb1s4IHNThtaoMfq9CheiGfzswwRrSgOcICM9ZUyU99t5jlTOZsAPFd70ZqFxOkRQgU51Xwh0aNYY6O2YFPluwHZ7keM7C5m0juC9Kn5ajfh/3MlM5UzG4AeQPpdsdW1raVVs5cvpVnnJAQ3R/VEM7fr84RyDgqgPfa158W6yis6fqtLIBT45sJOj9e9oZa+hqXVhIWZHVgPMV4KLsX+kp1e2ZCAPkzmCq+QfD4Efi/w+oqpc/uaPUzqcTGVsxrAa+H5bncEi7HSGmq4eiez+Sc8kd7QfVr2sqcZK97ZKGHwE67Fmyg0gmohj1SET0fa/f1tVtAFYm5UY1Fw/jCKAqxizGxhkgALabCDREpEkiSvGY2OWqyInPgPdzcwBtuCmgYAAAAASUVORK5CYII=" },
        { title: "退出" ,icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADd0lEQVRYR+2XS4hcRRSGv7o9pnHR4/TtnoVBhJDUBE2UiLrxEaISV+LCx+DaxBiqJxGi4iNrxQhGzKTLCYLiwoWOsxIRA5r4wo34IFEmXRnduFFmqmOycYaZKqmem9jT3u7b3bZkY8GFpuucU9/969SpcwWXeYjLvD59A8TarAR4W168kvGtS/2+yL8B8AlA/j8DKGmjF5RUaW8Xa9MRoKhrR+pqbH+WMqkKFI/NXcuKe1vADqtkqk1Jmz895G15MVWBBPBjrmC3fUz+2g4kNXiszSfA3UDNKrk5zbkLgNPAFuBTq+Q9XQMUtXlGwEvABbfC/ef2yZN9AUyZ63G8FyA8PFtX8lBanDUKjFR/2RaJ5c+BAvhHrRp7qx15lgLBb+R1c1PkCfG880Pbz1U2fN8abw1ArM0rwAFg2io53imBugEI/iVtnvPwInDYKvlkW4Dhw6fjofy6UwixPoqiW+f3bvxmEAAhRlyt/QzklxeXbjh/YKttjntJgWLVKCGoAu9aJR/JOj7dKtAA0OYNYLf3VOoVqVMBYl07BmKPJ7qvrjZ+OEiAkUmzI8pxAs+btiJ3pSugzYlw7kVu6LqFxzfMZgFkFaJm//LRuTEXuTPAV1bJO9ptwe9CMBrlR4bnd41eGCjAodmCK+TOA/NWydE2W2CCQYFlrrL7ZfjdccTaLCZ3QSHrLoiPmGGG+CPUFqvkcDuAINEYEVvsXvlTFkAv8/FqUfoxrbL+fQqSHADGrZLTvSyQZVuq1h7wQsx4OFlX8q5UBUraVDwc7aYIZS3YOl+smkkhmBBwcEHJUJQujSYFZm8U5H5ozDhusxPy614XSrNP9v8zYFtagWstxe8DDw5ShVjXXgbxNDBjlXyoFXINQFGfuVMQhcsDvHjKVjaFu6HvEU/VduLE8UY43Pa62vxFR4AwGToZgdjXOGJtmpFuiS4Wq3AZ1ZU8mOaX3hFpYwRsShx6PhWxNg9DoxcI4x/VLzUJW+libb4Ebk/+n8bxalZilvXZmx1uT7hTVmXnbF1J2Umxjl1xUZsXBDzfFOAjL3hHCL5jidU+bx3X4BqtV3jr8KymEH6y76a0mThJzCeS09HN9s943GtpCdd1DqQZlqfmbvHO3etgp4D1wNWAEILfvG88H+Q8x+cn5LfdUF606fvDpJdF+s6BQS3yP0AnBf4C4vh6MKas2UAAAAAASUVORK5CYII="}
    ]);
    ui.menu.on("item_click", item => {
        switch (item.title) {
            case "更新日志":
                dialogs.build({
                    title: "更新日志",
                    positive: "确定",
                    items: ["v1.0.2 修改关于说明\nv1.0.1 导入UI页面"]
                }).on("show", (dialog) => { }).show();
                break;
            case "检查更新":
                threads.start(function () {
                    toastLog("已经是最新版");
                });
                break;
            case "教程":
                    app.openUrl("https://blog.csdn.net/zy0412326/article/details/104767602");
                    break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["该脚本纯属个人爱好，如果涉及到侵权请通知作者，作者会尽快解决相应问题。\n页面：© MonkT\n程序：© sadboy\n邮箱：wx@sadboy.cn"]
                }).on("show", (dialog) => { }).show();
                break;
            case "退出":
                ui.finish();
                break;
        }
    });
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
} 
 
 
/**
 * 初始化UI和数据
 */
function initializeData() {
    var woolStorage = storages.create(localDbName);//创建本地存储
    var foreachTimes = woolStorage.get("foreachTimes");
    var serverKeyStr = woolStorage.get("serverKeyStr");
    var timeHStr = woolStorage.get("timeHStr");
    var timeMStr = woolStorage.get("timeMStr");
    var timeSStr = woolStorage.get("timeSStr");
    var timeLostStr = woolStorage.get("timeLostStr");
    var screenSileTimes = woolStorage.get("screenSileTimes");
    var isShowConsole = woolStorage.get("isShowConsole");
    var isLighting = woolStorage.get("isLighting");
    var isNoticeSwitch = woolStorage.get("isNoticeSwitch");
    var timesInterval = woolStorage.get("timesInterval");
    var appInstallDateTime = woolStorage.get("appInstallDateTime");
    var comNameStr = woolStorage.get("comNameStr");
    if (foreachTimes != null) {
        ui.lockCode.setText(foreachTimes);
    }
    if (serverKeyStr != null) {
        ui.serverKey.setText(serverKeyStr);
    }
    if (timeHStr != null) {
        ui.timeH.setText(timeHStr);
    }
    if (timeMStr != null) {
        ui.timeM.setText(timeMStr);
    }
    if (timeSStr != null) {
        ui.timeS.setText(timeSStr);
    }
    if (timeLostStr != null) {
        ui.timeLost.setText(timeLostStr);
    }
    if (screenSileTimes != null) {
        ui.ddAccount.setText(screenSileTimes);
    }
    if (isShowConsole != null && isShowConsole == "true") {
        ui.switchIsShowConsole.setChecked(true);
    } else {
        ui.switchIsShowConsole.setChecked(false);
    }
    if (isLighting != null && isLighting == "true") {
        ui.lighting.setChecked(true);
    } else {
        ui.lighting.setChecked(false);
    }
    if (isNoticeSwitch != null && isNoticeSwitch == "true") {
        ui.noticeSwitch.setChecked(true);
    } else {
        ui.noticeSwitch.setChecked(false);
    }
    if (timesInterval != null) {
        ui.ddCode.setText(timesInterval);
    }
    if (comNameStr != null) {
        ui.comName.setText(comNameStr);
    }
    if (appInstallDateTime != null) {
        var curTime = new Date();
        var currentTime = new Date(parseInt(curTime.getFullYear()), parseInt(curTime.getMonth() + 1), parseInt(curTime.getDate()), parseInt(curTime.getHours()), parseInt(curTime.getMinutes()), parseInt(curTime.getSeconds()));
        var appInstallDate = appInstallDateTime.toString().split("-");
        var getDay = appInstallDate[2].split(" ")[0]; //天
        var hourMM = appInstallDate[2].split(" ")[1];//时分秒
        var appInstallTime = new Date(parseInt(appInstallDate[0]), parseInt(appInstallDate[1]), parseInt(getDay), hourMM.split(":")[0], hourMM.split(":")[1], parseInt(0));
        var seconds=currentTime - appInstallTime;
        if (seconds/(1000 * 60 * 60 * 24)>3*365) {
            alert("脚本已经过去3年了,烦请打赏一下作者，您的支持是作者最大的动力！");
            woolStorage.put("appInstallDateTime", "" + getTime() + "");
        }
    } else {
        woolStorage.put("appInstallDateTime", "" + getTime() + "");
    }
}
 
 
/**
 * 获取被选择的app
 */
function getAppList() {
    var appArray = new Array(); //app集合
    return appArray;
}
  
/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime, timesInterval) {
    swipe(startX, startY, endX, endY, pressTime);
    let randomMin = timesInterval * 1000;
    let randomMax = (parseInt(timesInterval) + 2) * 1000;
    let delayTime = random(randomMin, randomMax);
    sleep(delayTime);
}
  
/**
 *点击一下屏幕
 */
function clickScreen() {
    var x = device.width / 2;
    var y = device.height / 2;
    click(x, y);
}
 
/**
 *向右侧滑动
 */
function sildeScreenRight() {
    pressTime = random(250, 600);
    swipe(750, 1000, 100, 1000, pressTime);//750, 120, 100, 120, 100
    delayTime = random(25000, 30000);
    sleep(delayTime);
}
 
/**
 * 随机点赞
 * @param {点赞ID}} view_id 
 */
function randomHeart(view_id) {
    index = random(1, 100);
    if (index == 66) {
        var target = id(view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
 
/**
 * 随机关注
 * @param {*} follow_view_id 
 */
function randomFollow(follow_view_id) {
    index = random(1, 100);
    if (index == 66) {
        var target = id(follow_view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
 
/**
 * 随机上滑（防止被判定是机器）上滑后停留时间至少是10S，造成假象表示是对内容感兴趣
 * 点赞和关注先不搞。
 */
function randomUpSildeScreen() {
    let randomIndex = random(1, 50);
    if (randomIndex == 1) {
        showLog("随机上滑被执行了!!!");
        pressTime = random(200, 500);
        swipe(device.width / 2, 500, device.width / 2, device.height - 200, 300);
        delayTime = random(10000, 15000);
        sleep(delayTime);
    }
}
 
/**
 * 连续下滑对上一个无兴趣
 * 其实得和上滑做个排他，既然无兴趣不要在上滑
 */
function randomDownSildeScreen() {
    let randomIndex = random(1, 20);
    if (randomIndex == 1) {
        showLog("连续下滑被执行了");
        swipe(device.width / 2, device.height - 200, device.width / 2, 500, 300);
        sleep(2000);
        swipe(device.width / 2, device.height - 200, device.width / 2, 500, 300);
        delayTime = random(8000, 10000);
        sleep(delayTime);
    }
}
 
/**
 *  
 * 获取当前时间
 */
function getTime() {
    return common.getTime();
};
 
/**
 * 将输入框等的值转为json
 */
function textObj(){
    var obj = {
        "lighting":ui.lighting.isChecked(),
        "lockCode":ui.lockCode.getText(),
        "ddAccount":ui.ddAccount.getText(),
        "ddCode":ui.comName.getText(),
        "ddCom": ui.comName.getText(),
        "noticeSwitch":ui.noticeSwitch.isChecked(),
        "serverKey":ui.serverKey.getText(),
        "timeH":getInt(ui.timeH.getText()),
        "timeM":getInt(ui.timeM.getText()),
        "timeS":getInt(ui.timeS.getText()),
        "timeLost":getInt(ui.timeLost.getText()),
        "debug":ui.switchIsShowConsole.isChecked()
    }
    return obj;
}

/**
 * 将字符转数字，默认0
 * @param {*} text 
 */
function getInt(text){
    if(text == null || text == ""){
        return 0;
    }
    return parseInt(text);
}