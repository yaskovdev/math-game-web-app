(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){e.exports=a.p+"static/media/logo.8abf8d44.jpg"},17:function(e,t,a){e.exports=a(30)},22:function(e,t,a){},24:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(13),o=a.n(l),c=(a(22),a(6)),s=a(7),i=a(9),u=a(8),m=a(10),E=a(32),w=a(33),d=a(34),g=a(35),h=a(37),f=a(36),p=(a(24),function(e){var t=e.value;return r.a.createElement("h1",null,t.question," = ",t.answer,"?")}),v=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).formatWaitingMessage=function(e){return"CORRECT_FIRST_ANSWER"===e?r.a.createElement("span",{className:"text-success"},"Correct answer!"):"CORRECT_LATE_ANSWER"===e?r.a.createElement("span",{className:"text-warning"},"Correct, but too late..."):"WRONG_ANSWER"===e?r.a.createElement("span",{className:"text-danger"},"Wrong answer."):r.a.createElement("span",null,"Waiting for a new round...")},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.value;return r.a.createElement("h1",null,this.formatWaitingMessage(e))}}]),t}(n.PureComponent),b=function(){return r.a.createElement("h1",null,"Checking...")},N=a(14),j=a.n(N),O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={joined:!1,user:{},challenge:null,ratingTable:[],waitingForNewRound:!0,userGaveAnswer:!1},a.join=function(){var e=new(window.WebSocket||window.MozWebSocket)("ws://localhost:8080");a.setState({connection:e}),e.onopen=function(){a.setState({joined:!0})},e.onerror=function(e){console.log("Error occurred",e)},e.onmessage=function(e){var t=JSON.parse(e.data),n=t.type;if("WELCOME"===n){var r=t.user,l=t.ratingTable;a.setState({user:r,ratingTable:l})}else if("START_ROUND"===n){var o=t.challenge;a.setState({challenge:o,waitingForNewRound:!1})}else{if("END_ROUND"!==n)throw new Error("unexpected message type "+n);var c=t.result,s=t.ratingTable;a.setState({result:c,ratingTable:s,waitingForNewRound:!0,userGaveAnswer:!1})}}},a.leave=function(){a.setState({joined:!1}),a.state.connection.close()},a.format=function(e,t){return t?r.a.createElement(b,null):r.a.createElement(p,{value:e})},a.answer=function(e){a.setState({userGaveAnswer:!0}),a.state.connection.send(e)},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.joined,l=t.user,o=t.challenge,c=t.ratingTable,s=t.result,i=t.waitingForNewRound,u=t.userGaveAnswer;return r.a.createElement(E.a,null,r.a.createElement(w.a,null,r.a.createElement(d.a,{className:"text-center"},a&&r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("h4",null,l.name)),r.a.createElement("p",null,i?r.a.createElement(v,{value:s}):this.format(o,u)),r.a.createElement("p",null,r.a.createElement(g.a,{size:"lg"},r.a.createElement(h.a,{onClick:function(){return e.answer(!0)},disabled:u||i},"True"),r.a.createElement(h.a,{onClick:function(){return e.answer(!1)},disabled:u||i},"False")))),!a&&r.a.createElement(n.Fragment,null,r.a.createElement(w.a,{className:"App-logo-row"},r.a.createElement(d.a,null,r.a.createElement("img",{src:j.a,alt:"Math Game Logo"}))),r.a.createElement(w.a,null,r.a.createElement(d.a,null,r.a.createElement(h.a,{onClick:this.join},"Let's play a game!")))),a&&r.a.createElement(h.a,{color:"link",onClick:this.leave},"Leave the game"),a&&c.length>0&&r.a.createElement(f.a,null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Score"))),r.a.createElement("tbody",null,c.map(function(t){var a=t.id===e.state.user.id;return r.a.createElement("tr",{key:t.id,className:a?"App-user-table-record":""},r.a.createElement("td",null,a?t.name+" (you)":t.name),r.a.createElement("td",null,t.score))}))))))}}]),t}(n.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(28);o.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.f5c67bdb.chunk.js.map