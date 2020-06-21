require("./common/manifest.js")
require("./debug/GenerateTestUserSig.js")
require("./common/vendor.js")


import TIM from './miniprogram_npm/tim-wx-sdk/index';
//发送图片、文件等消息需要的 COS SDK
import COS from './miniprogram_npm/cos-wx-sdk-v5/index';//如果聊天发送的是纯文字，这里不必要导入

let options = {
  SDKAppID: 1400381247 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// 注册 COS SDK 插件
tim.registerPlugin({ 'cos-wx-sdk': COS });//如果聊天发送的是纯文字，这里不需要注册

App({
  tim: tim,  //定义全局变量，供其他页面调用tim实例
  event:{
    MsgReceive: TIM.EVENT.MESSAGE_RECEIVED,
    SdkReady:TIM.EVENT.SDK_READY
  },

  onLaunch: function () {
    // 展示本地存储能力
    wx.showToast({
        title: "点击登录即可为您分配用户名",
        icon:"none",
        duration:2000
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onLoad: function(options) {
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    console.log(prevpage.route)
  },


  globalData: {
    userInfo: null,
    userId:"",
    num:100,
    youke:1
  },
})
global.webpackJsonpMpvue([1],{"17x+":function(e,t,n){"use strict";var a={state:{isSdkReady:!1,isCalling:!1,systemInfo:null},getters:{isSdkReady:function(e){return e.isSdkReady},isCalling:function(e){return e.isCalling},isIphoneX:function(e){return e.systemInfo&&e.systemInfo.model.indexOf("iPhone X")>-1}},mutations:{showToast:function(e,t){wx.showToast({title:t.title,icon:t.icon||"none",duration:t.duration||800})},setSdkReady:function(e,t){e.isSdkReady=t},setCalling:function(e,t){e.isCalling=t},setSystemInfo:function(e,t){e.systemInfo=t}},actions:{resetStore:function(e){e.commit("resetGroup"),e.commit("resetUser"),e.commit("resetCurrentConversation"),e.commit("resetAllConversation")}}};t.a=a},IcnI:function(e,t,n){"use strict";var a=n("5nAL"),r=n.n(a),o=n("NYxO"),s=n("tn05"),i=n("xTcS"),u=n("bREw"),c=n("17x+");r.a.use(o.a),t.a=new o.a.Store({modules:{conversation:s.a,group:i.a,user:u.a,global:c.a}})},KdIz:function(e,t){},M93x:function(e,t,n){"use strict";var a=n("Mw+1");var r=function(e){n("KdIz")},o=n("ybqe")(a.a,null,r,null,null);t.a=o.exports},"Mw+1":function(e,t,n){"use strict";t.a={created:function(){}}},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("5nAL"),r=n.n(a),o=n("M93x"),s=n("PDEy"),i=n.n(s),u=n("IcnI"),c=n("oqQY"),l=n.n(c),f=n("uM1m"),p=(n.n(f),n("0xDb")),d=n("h1dT"),m=n.n(d),g=n("dutN"),v=n("Bbwh"),E=i.a.create({SDKAppID:g.a});E.setLogLevel(0),wx.$app=E,wx.$app.registerPlugin({"cos-wx-sdk":m.a}),wx.store=u.a,wx.TIM=i.a,wx.dayjs=l.a,l.a.locale("zh-cn");var I=new r.a;function M(e){var t=e.name===i.a.EVENT.SDK_READY;t&&(wx.$app.getMyProfile().then(function(e){u.a.commit("updateMyInfo",e.data)}),wx.$app.getBlacklist().then(function(e){u.a.commit("setBlacklist",e.data)})),u.a.commit("setSdkReady",t)}r.a.prototype.TIM=i.a,r.a.prototype.$type=v.a,r.a.prototype.$store=u.a,r.a.prototype.$bus=I,E.on(i.a.EVENT.SDK_READY,M,this),E.on(i.a.EVENT.SDK_NOT_READY,M,this),E.on(i.a.EVENT.KICKED_OUT,function(e){u.a.dispatch("resetStore"),wx.showToast({title:"你已被踢下线",icon:"none",duration:1500}),setTimeout(function(){wx.reLaunch({url:"../login/main"})},500)},this),E.on(i.a.EVENT.ERROR,function(e){e.data.message&&e.data.code&&2800!==e.data.code&&2999!==e.data.code&&u.a.commit("showToast",{title:e.data.message,duration:2e3})},this),E.on(i.a.EVENT.MESSAGE_RECEIVED,function(e){for(var t=0;t<e.data.length;t++){var n=e.data[t];if(n.type===v.a.MSG_GRP_TIP&&n.payload.operationType&&I.$emit("groupNameUpdate",n.payload),n.type===v.a.MSG_CUSTOM&&Object(p.c)(n.payload.data)){var a=JSON.parse(n.payload.data);if(3===a.version)switch(a.action){case 0:if(u.a.getters.isCalling)I.$emit("isCalling",n);else{var r="../call/main?args="+n.payload.data+"&&from="+n.from+"&&to="+n.to;wx.navigateTo({url:r})}break;case 1:wx.navigateBack({delta:1});break;case 2:I.$emit("onRefuse");break;case 3:wx.navigateBack({delta:1});break;case 4:I.$emit("onCall",a);break;case 5:I.$emit("onClose");break;case 6:I.$emit("onBusy")}}}u.a.dispatch("onMessageEvent",e)},this),E.on(i.a.EVENT.CONVERSATION_LIST_UPDATED,function(e){u.a.commit("updateAllConversation",e.data)},this),E.on(i.a.EVENT.GROUP_LIST_UPDATED,function(e){u.a.commit("updateGroupList",e.data)},this),E.on(i.a.EVENT.BLACKLIST_UPDATED,function(e){u.a.commit("updateBlacklist",e.data)},this),E.on(i.a.EVENT.NET_STATE_CHANGE,function(e){console.log(e.data.state),u.a.commit("showToast",function(e){switch(e){case i.a.TYPES.NET_STATE_CONNECTED:return{title:"已接入网络",duration:2e3};case i.a.TYPES.NET_STATE_CONNECTING:return{title:"当前网络不稳定",duration:2e3};case i.a.TYPES.NET_STATE_DISCONNECTED:return{title:"当前网络不可用",duration:2e3};default:return""}}(e.data.state))},this),E.on(i.a.EVENT.MESSAGE_READ_BY_PEER,function(e){console.log(e)});var C=wx.getSystemInfoSync();u.a.commit("setSystemInfo",C),new r.a({TIMApp:o.a}).$mount()},Srkd:function(e,t,n){"use strict";t.a=function(e){switch(e.type){case"TIMTextElem":return function(e){var t=[],n=e.payload.text,a=-1,r=-1;for(;""!==n;)switch(a=n.indexOf("["),r=n.indexOf("]"),a){case 0:if(-1===r)t.push({name:"span",text:n}),n="";else{var s=n.slice(0,r+1);o.a[s]?(t.push({name:"img",src:o.c+o.a[s]}),n=n.substring(r+1)):(t.push({name:"span",text:"["}),n=n.slice(1))}break;case-1:t.push({name:"span",text:n}),n="";break;default:t.push({name:"span",text:n.slice(0,a)}),n=n.substring(a)}return t}(e);case"TIMGroupSystemNoticeElem":return function(e){var t=e.payload,n=t.groupProfile.name||t.groupProfile.groupID,a=void 0;switch(t.operationType){case 1:a=t.operatorID+" 申请加入群组："+n;break;case 2:a="成功加入群组："+n;break;case 3:a="申请加入群组："+n+"被拒绝";break;case 4:a="被管理员"+t.operatorID+"踢出群组："+n;break;case 5:a="群："+n+" 已被"+t.operatorID+"解散";break;case 6:a=t.operatorID+"创建群："+n;break;case 7:a=t.operatorID+"邀请你加群："+n;break;case 8:a="你退出群组："+n;break;case 9:a="你被"+t.operatorID+"设置为群："+n+"的管理员";break;case 10:a="你被"+t.operatorID+"撤销群："+n+"的管理员身份";break;case 255:a="自定义群系统通知: "+t.userDefinedField}return[{name:"system",text:a}]}(e);case"TIMGroupTipElem":return function(e){var t=e.payload,n=e.nick||t.userIDList.join(","),a=void 0;switch(t.operationType){case i.MEMBER_JOIN:a="新成员加入："+n;break;case i.MEMBER_QUIT:a="群成员退群："+n;break;case i.MEMBER_KICKED_OUT:a="群成员被踢："+n;break;case i.MEMBER_SET_ADMIN:a=t.operatorID+"将 "+n+"设置为管理员";break;case i.MEMBER_CANCELED_ADMIN:a=t.operatorID+"将 "+n+"取消作为管理员";break;case i.GROUP_INFO_MODIFIED:a="群资料修改";break;case i.MEMBER_INFO_MODIFIED:var o=!0,s=!1,u=void 0;try{for(var c,l=r()(t.memberList);!(o=(c=l.next()).done);o=!0){var f=c.value;a=f.muteTime>0?"群成员："+f.userID+"被禁言"+f.muteTime+"秒":"群成员："+f.userID+"被取消禁言"}}catch(e){s=!0,u=e}finally{try{!o&&l.return&&l.return()}finally{if(s)throw u}}}return[{name:"groupTip",text:a}]}(e);case"TIMCustomElem":return function(e){var t=e.payload.data;if(Object(s.c)(t)&&(t=JSON.parse(t)).hasOwnProperty("version")&&3===t.version){var n=void 0,a=Object(s.a)(t.duration);switch(t.action){case-2:n="异常挂断";break;case 0:n="请求通话";break;case 1:n="取消通话";break;case 2:n="拒绝通话";break;case 3:n="无应答";break;case 4:n="开始通话";break;case 5:n=0===t.duration?"结束通话":"结束通话，通话时长"+a;break;case 6:n="正在通话中"}return[{name:"videoCall",text:n}]}return[{name:"custom",text:t}]}(e);default:return[]}};var a=n("BO1k"),r=n.n(a),o=n("lRgn"),s=n("0xDb"),i={MEMBER_JOIN:1,MEMBER_QUIT:2,MEMBER_KICKED_OUT:3,MEMBER_SET_ADMIN:4,MEMBER_CANCELED_ADMIN:5,GROUP_INFO_MODIFIED:6,MEMBER_INFO_MODIFIED:7}},bREw:function(e,t,n){"use strict";t.a={state:{myInfo:{},userProfile:{},blacklist:[]},getters:{myInfo:function(e){return e.myInfo},userProfile:function(e){return e.userProfile}},mutations:{updateMyInfo:function(e,t){e.myInfo=t},updateUserProfile:function(e,t){e.userProfile=t},setBlacklist:function(e,t){e.blacklist=t},updateBlacklist:function(e,t){e.blacklist.push(t)},resetUser:function(e){e.blacklist=[],e.userProfile={},e.myInfo={}}}}},tn05:function(e,t,n){"use strict";var a=n("//Fk"),r=n.n(a),o=n("Gu7T"),s=n.n(o),i=n("0xDb"),u=n("Srkd"),c=n("PDEy"),l=n.n(c),f={state:{allConversation:[],currentConversationID:"",currentConversation:{},currentMessageList:[],nextReqMessageID:"",isCompleted:!1,isLoading:!1},getters:{allConversation:function(e){return e.allConversation},toAccount:function(e){return 0===e.currentConversationID.indexOf("C2C")?e.currentConversationID.substring(3):0===e.currentConversationID.indexOf("GROUP")?e.currentConversationID.substring(5):void 0},toName:function(e){return"C2C"===e.currentConversation.type?e.currentConversation.userProfile.userID:"GROUP"===e.currentConversation.type?e.currentConversation.groupProfile.name:void 0},currentConversationType:function(e){return 0===e.currentConversationID.indexOf("C2C")?"C2C":0===e.currentConversationID.indexOf("GROUP")?"GROUP":""},currentConversation:function(e){return e.currentConversation},currentMessageList:function(e){return e.currentMessageList},totalUnreadCount:function(e){var t=e.allConversation.reduce(function(e,t){return e+t.unreadCount},0);return 0===t?wx.removeTabBarBadge({index:0}):wx.setTabBarBadge({index:0,text:t>99?"99+":String(t)}),t}},mutations:{unshiftMessageList:function(e,t){for(var n=[].concat(s()(t)),a=0;a<n.length;a++){var r=n[a];n[a].virtualDom=Object(u.a)(r);var o=new Date(1e3*r.time);n[a].newtime=Object(i.b)(o)}e.currentMessageList=[].concat(s()(n),s()(e.currentMessageList))},receiveMessage:function(e,t){for(var n=[].concat(s()(t)),a=0;a<n.length;a++){var r=n[a];n[a].virtualDom=Object(u.a)(r);var o=new Date(1e3*r.time);n[a].newtime=Object(i.b)(o)}e.currentMessageList=[].concat(s()(e.currentMessageList),s()(n))},sendMessage:function(e,t){t.virtualDom=Object(u.a)(t);var n=new Date(1e3*t.time);t.newtime=Object(i.b)(n),e.currentMessageList.push(t),setTimeout(function(){wx.pageScrollTo({scrollTop:99999})},800)},updateCurrentConversation:function(e,t){e.currentConversation=t,e.currentConversationID=t.conversationID},updateAllConversation:function(e,t){for(var n=0;n<t.length;n++)if(t[n].lastMessage&&"number"==typeof t[n].lastMessage.lastTime){var a=new Date(1e3*t[n].lastMessage.lastTime);t[n].lastMessage._lastTime=Object(i.b)(a)}e.allConversation=t},resetCurrentConversation:function(e){e.currentConversationID="",e.currentConversation={},e.currentMessageList=[],e.nextReqMessageID="",e.isCompleted=!1,e.isLoading=!1},resetAllConversation:function(e){e.allConversation=[]},removeMessage:function(e,t){e.currentMessageList.splice(e.currentMessageList.findIndex(function(e){return e.ID===t.ID}),1)},changeMessageStatus:function(e,t){e.currentMessageList[t].status="fail"}},actions:{onMessageEvent:function(e,t){if("onMessageReceived"===t.name){var n=e.state.currentConversationID;if(!n)return;var a=[];t.data.forEach(function(e){e.conversationID===n&&a.push(e)}),e.commit("receiveMessage",a)}},getMessageList:function(e){var t=e.state,n=t.currentConversationID,a=t.nextReqMessageID;e.state.isCompleted?wx.showToast({title:"没有更多啦",icon:"none",duration:1500}):e.state.isLoading?wx.showToast({title:"你拉的太快了",icon:"none",duration:500}):(e.state.isLoading=!0,wx.$app.getMessageList({conversationID:n,nextReqMessageID:a,count:15}).then(function(t){e.state.nextReqMessageID=t.data.nextReqMessageID,e.commit("unshiftMessageList",t.data.messageList),t.data.isCompleted&&(e.state.isCompleted=!0),e.state.isLoading=!1}).catch(function(e){console.log(e)}))},checkoutConversation:function(e,t){return e.commit("resetCurrentConversation"),wx.$app.setMessageRead({conversationID:t}),wx.$app.getConversationProfile(t).then(function(t){var n=t.data.conversation;e.commit("updateCurrentConversation",n),e.dispatch("getMessageList");var a="";switch(n.type){case l.a.TYPES.CONV_C2C:a=n.userProfile.nick||n.userProfile.userID;break;case l.a.TYPES.CONV_GROUP:a=n.groupProfile.name||n.groupProfile.groupID;break;default:a="系统通知"}return wx.navigateTo({url:"../chat/main?toAccount="+a+"&type="+n.type}),r.a.resolve()})}}};t.a=f},xTcS:function(e,t,n){"use strict";var a=n("Gu7T"),r=n.n(a),o={state:{groupList:[],currentGroupMemberList:[],count:15,isLoading:!1},getters:{hasGroupList:function(e){return e.groupList.length>0}},mutations:{updateGroupList:function(e,t){e.groupList=t},updateCurrentGroupMemberList:function(e,t){e.currentGroupMemberList=[].concat(r()(e.currentGroupMemberList),r()(t))},resetGroup:function(e){e.groupList=[],e.currentGroupProfile={},e.currentGroupMemberList=[]},resetCurrentMemberList:function(e){e.currentGroupMemberList=[]}},actions:{getGroupMemberList:function(e){var t=e.rootState.conversation.currentConversation.groupProfile,n=t.memberNum,a=t.groupID,r=e.state,o=r.count,s=r.isLoading,i=e.state.currentGroupMemberList.length;i<n?s?wx.showToast({title:"你拉的太快了",icon:"none",duration:500}):(e.state.isLoading=!0,wx.$app.getGroupMemberList({groupID:a,offset:i,count:o}).then(function(t){e.commit("updateCurrentGroupMemberList",t.data.memberList),e.state.isLoading=!1}).catch(function(e){console.log(e)})):wx.showToast({title:"没有更多啦",icon:"none",duration:1500})}}};t.a=o}},["NHnr"]);