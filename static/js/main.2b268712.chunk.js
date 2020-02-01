(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,a,t){e.exports=t.p+"static/media/logo.8abf8d44.jpg"},18:function(e,a,t){e.exports=t(31)},23:function(e,a,t){},25:function(e,a,t){},31:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(14),c=t.n(l),s=(t(23),t(6)),o=t(7),i=t(9),m=t(8),u=t(10),E=t(35),d=t(40),g=t(36),w=t(37),h=t(38),v=t(39),p=t(32),f=t(33),N=(t(25),function(e){var a=e.value;return r.a.createElement("h2",null,a.question," = ",a.suggestedAnswer,"?")}),b=t(15),y=t.n(b),S=function(e){var a=e.error,t=e.onLogin;return r.a.createElement(n.Fragment,null,r.a.createElement(p.a,{className:"login-pnl text-center"},r.a.createElement(f.a,null,r.a.createElement("img",{src:y.a,className:"logo-row",alt:"Math Game Logo"}))),r.a.createElement(p.a,{className:"text-center"},r.a.createElement(f.a,null,r.a.createElement(d.a,{onClick:t},"Let's play a game!"))),a&&r.a.createElement(p.a,{className:"error-row"},r.a.createElement(f.a,null,"An error occurred. Most likely the user limit was reached. Try again later.")))},k=t(34),j=function(e){var a=e.data,t=e.currentUser;return r.a.createElement(k.a,{responsive:!0,borderless:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",{className:"text-center"},"Score"))),r.a.createElement("tbody",null,a.map(function(e){var a=e.id===t.id;return r.a.createElement("tr",{key:e.id,className:a?"user-table-record":""},r.a.createElement("td",null,a?e.name+" (you)":e.name),r.a.createElement("td",{className:"text-center"},e.score))})))},A=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(l)))).formatWaitingMessage=function(e){return"CORRECT_FIRST_ANSWER"===e?r.a.createElement("span",{className:"text-success"},"Correct answer!"):"CORRECT_LATE_ANSWER"===e?r.a.createElement("span",{className:"text-warning"},"Correct, but too late..."):"WRONG_ANSWER"===e?r.a.createElement("span",{className:"text-danger"},"Wrong answer."):r.a.createElement("span",null,"Get ready...")},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=this.props.value;return r.a.createElement("h2",null,this.formatWaitingMessage(e))}}]),a}(n.PureComponent),O=function(){return r.a.createElement("h2",null,"Checking...")},R="ws://api-game.yaskovdev.com",C=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(l)))).state={error:!1,joined:!1,user:{},challenge:null,ratingTable:[],waitingForNewRound:!0,userGaveAnswer:!1},t.join=function(){var e=new(window.WebSocket||window.MozWebSocket)(R);t.setState({connection:e}),e.onopen=function(){t.setState({joined:!0})},e.onmessage=function(e){var a=JSON.parse(e.data),n=a.type;if("WELCOME"===n){var r=a.user,l=a.ratingTable;t.setState({user:r,ratingTable:l})}else if("START_ROUND"===n){var c=a.challenge;t.setState({challenge:c,waitingForNewRound:!1})}else{if("END_ROUND"!==n)throw new Error("unexpected message type "+n);var s=a.roundSummary,o=a.ratingTable;t.setState({roundSummary:s,ratingTable:o,waitingForNewRound:!0,userGaveAnswer:!1})}},e.onerror=function(){t.setState({error:!0})}},t.leave=function(){t.setState({joined:!1,error:!1}),t.state.connection.close()},t.format=function(e,a){return a?r.a.createElement(O,null):r.a.createElement(N,{value:e})},t.registerAnswer=function(e){t.setState({userGaveAnswer:!0}),t.state.connection.send(e)},t}return Object(u.a)(a,e),Object(o.a)(a,[{key:"showGame",value:function(){var e=this,a=this.state,t=a.challenge,n=a.roundSummary,l=a.waitingForNewRound,c=a.userGaveAnswer;return r.a.createElement("div",{className:"game-pnl-wrapper"},r.a.createElement(E.a,{className:"text-center game-pnl"},r.a.createElement("div",{className:"round-summary-pnl"},l?r.a.createElement(A,{value:n}):this.format(t,c)),r.a.createElement("div",{className:"btn-pnl"},r.a.createElement(d.a,{color:"success",size:"lg",className:"left-submit-btn",onClick:function(){return e.registerAnswer(!0)},disabled:c||l},"TRUE"),r.a.createElement(d.a,{color:"danger",size:"lg",className:"right-submit-btn",onClick:function(){return e.registerAnswer(!1)},disabled:c||l},"FALSE"))))}},{key:"render",value:function(){var e=this,a=this.state,t=a.error,n=a.joined,l=a.user,c=a.ratingTable;return r.a.createElement(g.a,{className:"main-container"},!n&&r.a.createElement(S,{error:t,onLogin:function(){return e.join()}}),n&&r.a.createElement(w.a,{color:"transparent",light:!0,className:"greeting-pnl"},r.a.createElement(h.a,{className:"ml-auto",navbar:!0},r.a.createElement(v.a,{className:"username-pnl"},r.a.createElement("p",null,"Hello, ".concat(l.name)),r.a.createElement(d.a,{color:"link",onClick:this.leave},"Leave")))),n&&r.a.createElement("div",{className:"align-middle"},r.a.createElement(p.a,{className:"game-board-pnl"},r.a.createElement(f.a,{md:c.length>0?"9":"12"},r.a.createElement(p.a,{noGutters:!0},this.showGame())),c.length>0&&r.a.createElement(f.a,{xs:"12",sm:"12",md:"3",className:"w-100"},r.a.createElement(p.a,{className:"h-100 w-100",noGutters:!0},r.a.createElement(j,{data:c,currentUser:this.state.user}))))))}}]),a}(n.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(29);c.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.2b268712.chunk.js.map