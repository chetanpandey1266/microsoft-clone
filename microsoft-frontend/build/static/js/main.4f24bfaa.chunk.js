(this["webpackJsonpmicrosoft-clone"]=this["webpackJsonpmicrosoft-clone"]||[]).push([[0],{102:function(e,t,n){},128:function(e,t,n){},129:function(e,t,n){},130:function(e,t,n){},131:function(e,t,n){},132:function(e,t,n){},19:function(e,t,n){var c=n(22).create({baseURL:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).BASE_URL});e.exports=c},193:function(e,t){},195:function(e,t){},218:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(93),i=n.n(s),r=(n(102),n(2)),o=(n(49),n.p+"static/media/navbar_icon.5546ccd0.png"),l=n(22),j=n.n(l),u=n(3),d=n(0);var m=function(){var e=Object(c.useState)({}),t=Object(r.a)(e,2),n=t[0],a=t[1],s=localStorage.getItem("token");return Object(d.jsx)("div",{children:s?Object(d.jsx)(u.a,{to:"/user?token=".concat(s)}):Object(d.jsx)("div",{className:"login",children:Object(d.jsxs)("div",{className:"login-main",children:[Object(d.jsx)("img",{src:o,alt:"Microsoft"}),Object(d.jsx)("h2",{children:"Sign in"}),Object(d.jsx)("form",{method:"POST",onSubmit:function(){j.a.post("/signin01",n).then((function(){console.log("Submitted Successfully")})).catch((function(e){console.log(e.message)}))},id:"login01",className:"login-main-email",children:Object(d.jsx)("input",{placeholder:"Email",name:"email",onChange:function(e){a(e.target.value)}})}),Object(d.jsxs)("p",{children:["No account? ",Object(d.jsx)("span",{children:"Create One!"})]}),Object(d.jsx)("div",{className:"login-main-button",children:Object(d.jsx)("button",{form:"login01",type:"submit",children:"Next"})})]})})})},b=(n(128),n(14));var O=function(){return Object(d.jsxs)("div",{className:"navbar-main",children:[Object(d.jsx)("div",{className:"navbar-icon",children:Object(d.jsx)("img",{src:o,alt:"microsoft"})}),Object(d.jsx)("div",{className:"navbar-item"}),Object(d.jsxs)("div",{className:"navbar-loginup",children:[Object(d.jsx)(b.b,{to:"/signup01",style:{textDecoration:"none"},children:Object(d.jsx)("div",{className:"navbar-logup",children:"Sign up for free"})}),Object(d.jsx)(b.b,{to:"/signin01",style:{textDecoration:"none",color:"#000"},children:Object(d.jsxs)("div",{className:"navbar-login",children:["Sign in",Object(d.jsx)("img",{src:"",alt:""})]})})]})]})},g=(n(129),n.p+"static/media/landingpg_01.9a342722.jpeg"),h=n.p+"static/media/landingpg_work.07c53f4b.png",x=n.p+"static/media/landingpg_home.8da56e92.jpeg",f=n.p+"static/media/landingpg_school.b2f25890.jpeg";var v=function(){return Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"landingPage-front",children:[Object(d.jsxs)("div",{className:"landingPage-front-leftside",children:[Object(d.jsx)("h1",{children:"Microsoft Teams"}),Object(d.jsx)("h3",{children:"Meet, chat, call and collaborate in just one place"}),Object(d.jsxs)("div",{className:"landingPage-front-loginup",children:[Object(d.jsx)(b.b,{to:"/signup01",style:{textDecoration:"none"},children:Object(d.jsx)("div",{className:"landingPage-front-logup",children:"Sign up for free"})}),Object(d.jsx)(b.b,{to:"/signin01",style:{textDecoration:"none"},children:Object(d.jsx)("div",{className:"landingPage-front-login",children:"Sign in"})})]})]}),Object(d.jsx)("div",{className:"landingPage-front-rightside",children:Object(d.jsx)("img",{src:g,alt:""})})]}),Object(d.jsxs)("div",{className:"landingPage-middle",children:[Object(d.jsxs)("div",{className:"landingPage-middle-txt",children:[Object(d.jsx)("h1",{children:"Microsoft Teams is for Everyone"}),Object(d.jsx)("p",{children:"Whether it\u2019s chat, calls, or video, anyone can engage at any time, bringing everyone closer."}),Object(d.jsx)("p",{children:"Your docs, photos, videos, chat history, and meeting notes are always there, so it\u2019s easier to work together."}),Object(d.jsx)("p",{children:"Set up your team\u2019s space with all the apps you need so you can stay in just one place instead of jumping around"})]}),Object(d.jsxs)("div",{className:"landingPage-middle-img",children:[Object(d.jsx)("div",{className:"landingPage-middle-img1-work",children:Object(d.jsx)("img",{src:h,alt:"work"})}),Object(d.jsxs)("div",{className:"landingPage-middle-img2",children:[Object(d.jsx)("div",{className:"landingPage-middle-img2-home",children:Object(d.jsx)("img",{src:x,alt:"home"})}),Object(d.jsx)("div",{className:"landingPage-middle-img2-school",children:Object(d.jsx)("img",{src:f,alt:"school"})})]})]})]}),Object(d.jsx)("div",{className:"landingPage-end"}),Object(d.jsx)("div",{className:"footer"})]})},p=n.p+"static/media/footer.dfaaed5a.png";n(130);var N=function(){return Object(d.jsxs)("div",{className:"footer-main",children:[Object(d.jsxs)("div",{className:"footer-main-left",children:[Object(d.jsx)("img",{src:p,alt:""}),Object(d.jsx)("p",{children:"  English"})]}),Object(d.jsx)("div",{className:"footer-main-right",children:Object(d.jsx)("p",{children:"Developed by Chetan \ud83d\udc99"})})]})};function S(){return Object(d.jsxs)("div",{children:[Object(d.jsx)(O,{}),Object(d.jsx)(v,{}),Object(d.jsx)(N,{})]})}var A=n(19),y=n.n(A);var C=function(){var e=Object(c.useState)(),t=Object(r.a)(e,2),n=t[0],a=t[1];return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"login",children:Object(d.jsxs)("div",{className:"login-main",children:[Object(d.jsx)("img",{src:o,alt:"Microsoft"}),Object(d.jsx)("h2",{children:"Sign in"}),Object(d.jsx)("form",{method:"POST",onSubmit:function(){y.a.post("/signin02",n).then((function(){return console.log("Suceeded")})).catch((function(e){console.log(e)}))},id:"login02",className:"login-main-email",children:Object(d.jsx)("input",{type:"password",placeholder:"Password",name:"password",onChange:function(e){return a(e)}})}),Object(d.jsx)("p",{children:Object(d.jsx)("span",{children:"Forgot Password!"})}),Object(d.jsx)("div",{className:"login-main-button",children:Object(d.jsx)("button",{form:"login02",type:"submit",children:"Sign in"})})]})})})};n(131);var E=function(e){var t=Object(u.g)();return Object(d.jsxs)("div",{class:"userNavbar-main",children:[Object(d.jsx)("h2",{children:"Microsoft Teams"}),Object(d.jsx)("form",{className:"userNavbar-main-search",children:Object(d.jsx)("input",{placeholder:"Search",type:"text"})}),Object(d.jsx)("div",{className:"userNavbar-main-profile",children:Object(d.jsx)("img",{src:"data:image/png;base64,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",alt:"user"})}),Object(d.jsx)("button",{onClick:function(){return e.socket.disconnect(),localStorage.clear(),void t.push("/")},className:"userNavbar-main-logout",children:"Logout"})]})};n(132);var F=function(e){return Object(d.jsxs)("div",{className:"userSidebar-main",children:[Object(d.jsx)("h2",{children:e.name}),Object(d.jsx)("div",{className:"userSidebar-main-profile",onClick:function(){return e.changeActive(0)},children:Object(d.jsx)("h5",{children:"Profile"})}),Object(d.jsx)("div",{className:"userSidebar-main-chats",onClick:function(){return e.changeActive(1)},children:Object(d.jsx)("h5",{children:"Chat"})}),Object(d.jsx)("div",{className:"userSidebar-main-team",onClick:function(){return e.changeActive(2)},children:Object(d.jsx)("h5",{children:"Teams"})})]})};n(58);var w=function(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),a=n[0],s=n[1],i=Object(c.useState)(""),o=Object(r.a)(i,2),l=o[0],j=o[1];Object(c.useEffect)((function(){j(localStorage.getItem("email")),s(localStorage.getItem("name"))}),[]),console.log(a,l);var u=localStorage.getItem("email");return Object(d.jsx)("div",{className:"userName-main-profile",children:Object(d.jsxs)("div",{className:"userName-main-profile-form",children:[Object(d.jsx)("h3",{children:"UserName"}),Object(d.jsx)("input",{type:"text",value:a,onChange:function(e){return s(e.target.value)},spellCheck:"false"}),Object(d.jsx)("h3",{children:"UserEmail"}),Object(d.jsx)("input",{type:"text",value:l,onChange:function(e){return j(e.target.value)},spellCheck:"false"}),Object(d.jsx)("button",{onClick:function(){y.a.put("/profile",{email:u,userName:a,userEmail:l}).then((function(e){localStorage.setItem("name",a),localStorage.setItem("email",l),console.log(e)})).catch((function(e){console.log(e)}))},children:"Save"})]})})},P=n(38),I=n(95),D=n.n(I),T=function(e){var t=e.messages,n=e.name;return Object(d.jsx)(D.a,{className:"messages",children:t.map((function(e,t){return Object(d.jsx)("div",{children:Object(d.jsx)(k,{message:e,name:n})},t)}))})},k=function(e){var t=e.message,n=t.user,c=t.msg,a=!1,s=e.name.trim().toLowerCase();return n===s&&(a=!0),a?Object(d.jsxs)("div",{className:"messageContainer justifyEnd",children:[Object(d.jsx)("p",{className:"sentText pr-10",children:s}),Object(d.jsx)("div",{className:"messageBox backgroundBlue",children:Object(d.jsx)("p",{className:"messageText colorWhite",children:c})})]}):Object(d.jsxs)("div",{className:"messageContainer justifyStart",children:[Object(d.jsx)("div",{className:"messageBox backgroundLight",children:Object(d.jsx)("p",{className:"messageText colorDark",children:c})}),Object(d.jsx)("p",{className:"sentText pl-10 ",children:n})]})};var R=function(e){var t=e.socket,n=JSON.parse(localStorage.getItem("user_msgs")),a=Object(c.useState)(""),s=Object(r.a)(a,2),i=s[0],o=s[1],l=Object(c.useState)(""),j=Object(r.a)(l,2),u=j[0],m=j[1],b=Object(c.useState)(""),O=Object(r.a)(b,2),g=O[0],h=O[1],x=Object(c.useState)([]),f=Object(r.a)(x,2),v=f[0],p=f[1],N=Object(c.useState)(""),S=Object(r.a)(N,2),A=(S[0],S[1],localStorage.getItem("name"));Object(c.useEffect)((function(){""!==i&&(t.emit("joinRoom",{name:A,room:i},(function(){})),void 0!==n[i]&&(console.log(n[i]),p(n[i])))}),[i]),Object(c.useEffect)((function(){t.on("message",(function(e){console.log(e.user,n[i]),"admin"===e.user&&0!==n[i].length?p(v):p([].concat(Object(P.a)(v),[e]))})),n[i]=v,localStorage.setItem("user_msgs",JSON.stringify(n))}),[v]);var y=function(e){e.preventDefault(),g&&t.emit("sendMsg",g,(function(){h("")}))};return Object(d.jsx)("div",{className:"userName-main-chat",children:""===i?Object(d.jsxs)("div",{className:"userName-main-chat-roomForm",children:[Object(d.jsx)("input",{type:"text",placeholder:"Enter the Room Name",onChange:function(e){return m(e.target.value)}}),Object(d.jsx)("button",{onClick:function(){o(u)},children:"Join Room"})]}):Object(d.jsxs)("div",{className:"userName-main-chat-room",children:[Object(d.jsx)("header",{className:"userName-main-chat-header",children:Object(d.jsx)("h1",{children:i})}),Object(d.jsx)("div",{className:"userName-main-chat-body",children:Object(d.jsxs)("div",{className:"userName-main-chat-mainside",children:[Object(d.jsx)(T,{messages:v,name:A}),Object(d.jsxs)("form",{className:"userName-main-chat-form",children:[Object(d.jsx)("input",{id:"msg",type:"text",placeholder:" Enter Message",required:!0,value:g,onChange:function(e){return h(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?y(e):null},autocomplete:"off"}),Object(d.jsxs)("div",{className:"userName-main-chat-form-btn",onClick:function(e){return y(e)},children:[Object(d.jsx)("img",{src:"https://img.icons8.com/fluent/30/000000/filled-sent.png"})," "]})]})]})})]})})},U=n(28),B=n.n(U);var L=n(220);function K(e){var t=Object(c.useRef)();return console.log(e.peer,e.key),Object(c.useEffect)((function(){e.peer.on("stream",(function(e){t.current.srcObject=e}))}),[]),Object(d.jsx)("video",{playsInline:!0,muted:!0,ref:t,autoPlay:!0,style:{width:"250px"}})}function V(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),a=n[0],s=n[1],i=e.setRoomID;return Object(d.jsxs)("div",{className:"userName-main-call-input",children:[Object(d.jsx)("input",{type:"text",placeholder:"Enter your Room ID",onChange:function(e){return s(e.target.value)}}),Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{style:{width:"10rem"},onClick:function(){return i(a)},children:"Join Room"}),Object(d.jsx)("button",{style:{width:"10rem"},onClick:function(){var e=Object(L.a)();i(e)},children:"Create Room"})]})]})}var W=function(e){var t=e.socket,n=Object(c.useState)(),a=Object(r.a)(n,2),s=a[0],i=a[1],o=Object(c.useState)([]),l=Object(r.a)(o,2),j=l[0],u=l[1],m=Object(c.useState)(""),b=Object(r.a)(m,2),O=b[0],g=b[1],h=Object(c.useState)(!0),x=Object(r.a)(h,2),f=x[0],v=x[1],p=Object(c.useState)(!0),N=Object(r.a)(p,2),S=N[0],A=N[1],C=Object(c.useState)(!0),E=Object(r.a)(C,2),F=E[0],w=E[1],I=Object(c.useState)(""),D=Object(r.a)(I,2),T=D[0],k=D[1],R=Object(c.useRef)([]),U=Object(c.useRef)();function L(e,n,c){var a=new B.a({initiator:!0,trickle:!1,stream:c});return a.on("signal",(function(c){t.emit("sending signal",{userToSignal:e,callerID:n,signal:c})})),a}return Object(c.useEffect)((function(){""!==O&&F&&(t.connect("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).BASE_URL,"/user")),console.log("one timer",O,F),w(!1),navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){i(e),U.current.srcObject=e,t.emit("join room"),t.on("all users",(function(n){var c=[];n.forEach((function(n){var a=new L(n,t.id,e);R.current.push({peerID:n,peer:a}),c.push({peerID:n,peer:a})})),u(c)})),t.on("user joined",(function(n){var c=function(e,n,c){var a=new B.a({initiator:!1,trickle:!1,stream:c});return a.on("signal",(function(e){t.emit("returning signal",{signal:e,callerID:n})})),a.signal(e),a}(n.signal,n.callerID,e);R.current.push({peerID:n.callerID,peer:c});var a={peer:c,peerID:c.callerID};u((function(e){return[].concat(Object(P.a)(e),[a])}))})),t.on("receiving returned signal",(function(e){R.current.find((function(t){return t.peerID===e.id})).peer.signal(e.signal)})),t.on("user left",(function(e){var t=R.current.find((function(t){return t.peerID===e}));t&&t.peer.destroy();var n=R.current.filter((function(t){return t.peerID!==e}));R.current=n,u(n)}))})))}),[O]),Object(d.jsx)("div",{className:"userName-main-team",children:""===O?Object(d.jsx)(V,{setRoomID:g}):Object(d.jsxs)("div",{className:"userName-main-team-videoContainer",children:[Object(d.jsxs)("h2",{children:["RoomID : ",O]}),Object(d.jsx)("button",{style:{width:"8rem"},onClick:function(){navigator.clipboard.writeText(O)},children:"Copy RoomID"}),Object(d.jsx)("input",{placeholder:"email to send invite ",onChange:function(e){return k(e.target.value)}}),Object(d.jsx)("button",{onClick:function(){y.a.post("/email",{senderEmail:localStorage.getItem("email"),email:T,roomID:O}).then((function(e){console.log(e)})).catch((function(e){return console.log(e.message)}))},children:"Send Invite"}),Object(d.jsxs)("div",{className:"userName-main-team-videos",children:[Object(d.jsxs)("div",{className:"userName-main-team-myvideo",children:[s&&Object(d.jsx)("video",{playsInline:!0,ref:U,autoPlay:!0,style:{width:"250px"}}),Object(d.jsxs)("div",{className:"userName-main-team-myvideo-btn",children:[Object(d.jsx)("button",{onClick:function(){f?U.current.pause():U.current.play(),v(!f)},children:Object(d.jsx)("img",{src:"https://img.icons8.com/material-outlined/24/000000/video.png"})}),Object(d.jsx)("button",{onClick:function(){U.current.muted=!!S,A(!S)},children:Object(d.jsx)("img",{src:"https://img.icons8.com/ios/24/000000/high-volume--v2.png"})}),Object(d.jsx)("button",{onClick:function(){return window.location.reload()},style:{backgroundColor:"#E44B35"},children:Object(d.jsx)("img",{src:"https://img.icons8.com/ios/24/000000/end-call.png"})})]})]}),j.map((function(e){return Object(d.jsx)("div",{className:"userName-main-team-uservideo",children:Object(d.jsx)(K,{peer:e.peer},e.peerID)})}))]})]})})};var q=function(e){var t=[Object(d.jsx)(w,{email:e.email}),Object(d.jsx)(R,{socket:e.socket}),Object(d.jsx)(W,{socket:e.socket})];return Object(d.jsx)("div",{className:"userName-main",children:t[parseInt(e.status)]})},H=n(96),M=n.n(H),Q=n(97),z=n.n(Q).a.connect(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).BASE_URL,{autoConnect:!1,path:"/user"});var G=function(){var e=Object(u.h)().search,t=M.a.parse(e),n=Object(c.useState)(!1),a=Object(r.a)(n,2),s=a[0],i=a[1],o=Object(c.useState)(""),l=Object(r.a)(o,2),j=(l[0],l[1],Object(c.useState)("")),m=Object(r.a)(j,2),b=m[0];m[1],Object(c.useEffect)((function(){y.a.post("/user",{token:t.token}).then((function(e){console.log(e.data),localStorage.setItem("token",t.token),z.on("me",(function(e){localStorage.setItem("socket",e),console.log(e)}));localStorage.getItem("user_msgs")||localStorage.setItem("user_msgs",JSON.stringify({})),z.connect("/user"),console.log(Date.now()),i(!0),console.log(e.data[0]),localStorage.setItem("name",e.data[0].name),localStorage.setItem("email",e.data[0].email)})).catch((function(e){console.log(e)})),z.on("me",(function(e){localStorage.setItem("socket",e),console.log(e)})),z.connect("/user")}),[t.token]);var O=Object(c.useState)(0),g=Object(r.a)(O,2),h=g[0],x=g[1];return s?Object(d.jsxs)("div",{children:[Object(d.jsx)(E,{socket:z}),Object(d.jsx)(F,{name:localStorage.getItem("name"),changeActive:x}),Object(d.jsx)(q,{socket:z,status:h,email:b})]}):Object(d.jsx)("div",{children:"Login Details May be Wrong"})},Z=n(34);n(92);var X=function(){var e=Object(c.useState)({email:"",name:""}),t=Object(r.a)(e,2),n=t[0],a=t[1],s=function(e,t){"email"===t?a(Object(Z.a)(Object(Z.a)({},n),{},{email:e})):"name"===t&&a(Object(Z.a)(Object(Z.a)({},n),{},{name:e}))};return Object(d.jsx)("div",{className:"signup",children:Object(d.jsxs)("div",{className:"signup-main",children:[Object(d.jsx)("img",{src:o,alt:"Microsoft"}),Object(d.jsx)("h2",{children:"Enter Details"}),Object(d.jsxs)("form",{id:"signup01_form",className:"signup-main-email",method:"POST",onSubmit:function(){j.a.post("/signup01",n).then((function(){return console.log("posted successfully")})).catch((function(e){return console.log(e)}))},children:[Object(d.jsx)("input",{type:"text",placeholder:"Name ( minimum 3 characters )",name:"name",onChange:function(e){return s(e.target.value,"name")},required:!0}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("input",{type:"text",placeholder:"someone@example.com",name:"email",onChange:function(e){return s(e.target.value,"email")},required:!0})]}),Object(d.jsx)("div",{className:"signup-main-button",children:Object(d.jsx)("button",{type:"submit",form:"signup01_form",children:"Next"})})]})})};var Y=function(e){var t=Object(c.useState)(),n=Object(r.a)(t,2),a=n[0],s=n[1];return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"signup",children:Object(d.jsxs)("div",{className:"signup-main",children:[Object(d.jsx)("img",{src:o,alt:"Microsoft"}),Object(d.jsx)("h2",{children:"Sign Up"}),Object(d.jsx)("form",{id:"signup02",className:"signup-main-email",method:"post",onSubmit:function(){return j.a.post("/signup02",a).then((function(e){console.log(e),console.log("Successfully posted !!")})).catch((function(e){return console.log(e.message)})),void localStorage.clear()},children:Object(d.jsx)("input",{type:"password",placeholder:"Password",name:"password",onChange:function(e){s(e.target.value)}})}),Object(d.jsx)("p",{children:"Create a password of min 6 characters"}),Object(d.jsx)("div",{className:"signup-main-button",children:Object(d.jsx)("button",{type:"submit",form:"signup02",children:"Sign in"})})]})})})};var J=function(){return Object(d.jsx)(b.a,{children:Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{path:"/",exact:!0,component:S}),Object(d.jsx)(u.b,{path:"/signin01",component:m}),Object(d.jsx)(u.b,{path:"/signin02",component:C}),Object(d.jsx)(u.b,{path:"/user",component:G}),Object(d.jsx)(u.b,{path:"/signup01",component:X}),Object(d.jsx)(u.b,{path:"/signup02",component:Y})]})})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,221)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),s(e),i(e)}))};i.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(J,{})}),document.getElementById("root")),_()},49:function(e,t,n){},58:function(e,t,n){},92:function(e,t,n){}},[[218,1,2]]]);
//# sourceMappingURL=main.4f24bfaa.chunk.js.map