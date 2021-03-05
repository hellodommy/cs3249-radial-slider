(this.webpackJsonpwidget=this.webpackJsonpwidget||[]).push([[0],{45:function(e,t,n){},46:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(19),s=n.n(i),o=(n(45),n(46),n(15)),c=n(16),h=n(6),u=n(18),d=n(17),l=n(77),p=n(79),j=n(80),b=n(78),m=n(73),O=n(2),w=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleClickAway=a.handleClickAway.bind(Object(h.a)(a)),a.state={error:!1},a}return Object(c.a)(n,[{key:"handleChange",value:function(e){this.props.onTemperatureChange(e.target.value)}},{key:"handleClickAway",value:function(e){this.props.currTemperature>=32&&this.props.currTemperature<=100?this.setState({error:!1}):(console.log(this.props.currTemperature),this.setState({error:!0}))}},{key:"render",value:function(){var e=this.props.currTemperature,t=this.state.error;return Object(O.jsx)(m.a,{onClickAway:this.handleClickAway,children:Object(O.jsxs)(b.a,{children:[Object(O.jsx)(l.a,{error:t,type:"number",id:"current-temperature-input",value:e,onChange:this.handleChange,endAdornment:Object(O.jsx)(p.a,{position:"end",children:"\xb0F"}),"aria-describedby":"current-temperature-input-helper-text",inputProps:{"aria-label":"currTemp"}}),Object(O.jsx)(j.a,{id:"current-temperature-input-helper-text",children:t?"Only between 32\xb0F to 100\xb0F":"Current Temperature"})]})})}}]),n}(r.a.Component),g=n(76),x=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleChange=a.handleChange.bind(Object(h.a)(a)),a}return Object(c.a)(n,[{key:"handleChange",value:function(e,t){this.props.onTemperatureChange(t)}},{key:"render",value:function(){var e=this.props.targetTemperature;return Object(O.jsx)("div",{children:Object(O.jsx)(g.a,{value:e,onChange:this.handleChange,valueLabelDisplay:"auto",min:50,max:80})})}}]),n}(r.a.Component),v=n(75);var f=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleMouseMove=a.handleMouseMove.bind(Object(h.a)(a)),a.handleMouseDown=a.handleMouseDown.bind(Object(h.a)(a)),a.handleMouseUp=a.handleMouseUp.bind(Object(h.a)(a)),a.componentDidMount=a.componentDidMount.bind(Object(h.a)(a)),a.componentWillUnmount=a.componentWillUnmount.bind(Object(h.a)(a)),a.updateWindowDimensions=a.updateWindowDimensions.bind(Object(h.a)(a)),a.state={windowWidth:window.innerWidth,windowHeight:window.innerHeight,xknob:186.7,yknob:50,xcord:0,ycord:0,isMouseDown:!1},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){this.setState({windowWidth:window.innerWidth,windowHeight:window.innerHeight})}},{key:"handleMouseMove",value:function(e){if(this.setState({xcord:e.pageX,ycord:e.pageY}),this.state.isMouseDown){var t=this.state.windowWidth/2-this.state.xcord,n=110-this.state.ycord,a=Math.atan2(n,t),r=100*Math.cos(a),i=100*Math.sin(a);this.setState({xknob:100-r}),this.setState({yknob:100-i}),console.log(180*a/Math.PI)}}},{key:"handleMouseDown",value:function(e){this.setState({isMouseDown:!0})}},{key:"handleMouseUp",value:function(e){this.setState({isMouseDown:!1})}},{key:"render",value:function(){var e=this.state.xcord,t=this.state.ycord,n=this.state.xknob,a=this.state.yknob,r=this.state.isMouseDown,i=this.state.windowWidth;return Object(O.jsxs)("div",{children:[Object(O.jsxs)("svg",{width:"200px",height:"200px",overflow:"visible",children:[Object(O.jsx)("circle",{onMouseMove:this.handleMouseMove,onMouseUp:this.handleMouseUp,fill:"#9CA3AF",cx:"100px",cy:"100px",r:"100px"}),Object(O.jsx)("circle",{fill:"#ffafaf",cx:n,cy:a,r:"10px",onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,style:{cursor:"pointer"}})]}),Object(O.jsxs)("p",{children:["X-Coord: ",e]}),Object(O.jsxs)("p",{children:["Y-Coord: ",t]}),Object(O.jsxs)("p",{children:["Is mouse down?: ",r?"true":"false"]}),Object(O.jsxs)("p",{children:["Window width: ",i]})]})}}]),n}(r.a.Component);var C=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleCurrTempChange=a.handleCurrTempChange.bind(Object(h.a)(a)),a.handleTargetTempChange=a.handleTargetTempChange.bind(Object(h.a)(a)),a.state={currTemperature:72,targetTemperature:72,mode:"off"},a}return Object(c.a)(n,[{key:"handleCurrTempChange",value:function(e){this.setState({currTemperature:e})}},{key:"handleTargetTempChange",value:function(e){this.setState({targetTemperature:e})}},{key:"render",value:function(){var e=this.state.currTemperature,t=this.state.targetTemperature,n=function(e,t){return e<t-2-1.5?"heating":e>t+2+1.5?"cooling":"off"}(e,t);return Object(O.jsx)("div",{children:Object(O.jsxs)(v.a,{container:!0,direction:"column",spacing:3,justify:"center",alignItems:"center",children:[Object(O.jsx)(v.a,{item:!0,xs:4,style:{width:"100%",marginTop:"10px"},children:Object(O.jsx)(f,{})}),Object(O.jsxs)(v.a,{item:!0,xs:4,children:[Object(O.jsxs)("p",{children:["Target temperature: ",t,"\xb0F"]}),Object(O.jsxs)("p",{children:["Current temperature: ",e,"\xb0F"]}),Object(O.jsxs)("p",{children:["Mode: ",n]})]}),Object(O.jsx)(v.a,{item:!0,xs:4,style:{width:"100%"},children:Object(O.jsx)(x,{targetTemperature:t,onTemperatureChange:this.handleTargetTempChange})}),Object(O.jsx)(v.a,{item:!0,xs:12,children:Object(O.jsx)(w,{currTemperature:e,onTemperatureChange:this.handleCurrTempChange})})]})})}}]),n}(r.a.Component);var y=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(C,{})})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,82)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),i(e),s(e)}))};s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(y,{})}),document.getElementById("root")),M()}},[[52,1,2]]]);
//# sourceMappingURL=main.c777d867.chunk.js.map