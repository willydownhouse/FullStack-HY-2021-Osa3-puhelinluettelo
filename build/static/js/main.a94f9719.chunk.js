(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n(14),a=n.n(c),o=n(3),u=n(0),r=function(e){var t=e.message,n=e.errorMessage;return t||n?t?Object(u.jsx)("div",{className:"ui green message",children:t}):Object(u.jsx)("div",{className:"ui error message",children:n}):null},i=function(e){var t=e.filter,n=e.setFilter,s=e.placeholder;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"ui input",children:Object(u.jsx)("input",{value:t,type:"text",onChange:function(e){return n(e.target.value)},placeholder:s})}),Object(u.jsx)("div",{className:"ui hidden divider"})]})},l=n(4),d=n.n(l),m="/api/persons",j=function(){return d.a.get(m).then((function(e){return e.data}))},b=function(e){return d.a.post(m,e).then((function(e){return e.data}))},h=function(e,t){return d.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},f=function(e){return d.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var t=e.phoneBook,n=e.setPhoneBook,s=e.newName,c=e.setNewName,a=e.phoneNumber,o=e.setPhoneNumber,r=e.setErrorMessage,i=e.setSuccessMessage;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("form",{className:"ui form",onSubmit:function(e){if(e.preventDefault(),!t.map((function(e){return e.name})).includes(s))return b({name:s,number:a}).then((function(e){n(t.concat(e.data)),i("New number created succesfully!"),setTimeout((function(){i(null)}),5e3)})).catch((function(e){console.log(e.response.data),e.response.data.message?r(e.response.data.message):r("Couldnt add ".concat(s," to the phonebook, please try again!")),setTimeout((function(){r(null)}),5e3)})),c(""),void o("");if(window.confirm("".concat(s," is already in the phonebook, do you want to replace the old number with the new one"))){var u=t.find((function(e){return e.name===s}));h(u._id,{name:s,number:a}).then((function(e){n(t.map((function(t){return t._id!==e.data._id?t:e.data}))),i("Number updated succesfully!"),setTimeout((function(){i(null)}),5e3)})).catch((function(e){console.log(e.response.data),e.response.data.message?r(e.response.data.message):r("Couldnt update ".concat(s,"s number, please try again!")),setTimeout((function(){r(null)}),5e3)})),c(""),o("")}},children:[Object(u.jsxs)("div",{className:"field",children:[Object(u.jsx)("label",{children:"Name"}),Object(u.jsx)("input",{value:s,onChange:function(e){return c(e.target.value)}})]}),Object(u.jsxs)("div",{className:"field",children:[Object(u.jsx)("label",{children:"Phonenumber"}),Object(u.jsx)("input",{value:a,onChange:function(e){return o(e.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{className:"ui button secondary",type:"submit",children:"Add"})})]}),Object(u.jsx)("div",{className:"ui hidden divider"})]})},O=function(e){var t=e.title,n=e.phoneBook,s=e.filter,c=e.setPhoneBook,a=e.setSuccessMessage;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{className:"ui header",children:t}),Object(u.jsx)("div",{className:"ui middle aligned divided list",children:n.map((function(e){return e.name.toLowerCase().includes(s)?Object(u.jsxs)("div",{className:"item",children:[Object(u.jsx)("div",{className:"right floated content",children:Object(u.jsx)("div",{onClick:function(){return function(e){window.confirm("Are you sure you want to delete ".concat(e.name," from phonebook?"))&&(f(e._id),c(n.filter((function(t){return t._id!==e._id}))),a("Number deleted succesfully!"),setTimeout((function(){a(null)}),3e3))}(e)},className:"ui button",children:"Delete"})}),Object(u.jsxs)("div",{className:"content",children:[e.name," ",e.number?e.number:"No phonenumber"]})]},e.name):null}))})]})},g=function(){var e=Object(s.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)(""),l=Object(o.a)(a,2),d=l[0],m=l[1],b=Object(s.useState)(""),h=Object(o.a)(b,2),f=h[0],g=h[1],v=Object(s.useState)(""),N=Object(o.a)(v,2),x=N[0],w=N[1],k=Object(s.useState)(null),y=Object(o.a)(k,2),S=y[0],B=y[1],M=Object(s.useState)(null),P=Object(o.a)(M,2),C=P[0],T=P[1];return Object(s.useEffect)((function(){j().then((function(e){c(e.data)})).catch((function(e){B(e.message),setTimeout((function(){B(null)}),5e3)}))}),[]),Object(u.jsxs)("div",{className:"ui container",children:[Object(u.jsx)("h1",{className:"ui header",children:"Phonebook"}),Object(u.jsx)(i,{placeholder:"Filter names...",filter:x,setFilter:w}),Object(u.jsx)(p,{phoneBook:n,setPhoneBook:c,newName:d,setNewName:m,phoneNumber:f,setPhoneNumber:g,setErrorMessage:B,setSuccessMessage:T}),Object(u.jsx)(r,{message:C,errorMessage:S}),Object(u.jsx)(O,{title:"Numbers",filter:x,phoneBook:n,setPhoneBook:c,setSuccessMessage:T})]})};a.a.render(Object(u.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.a94f9719.chunk.js.map