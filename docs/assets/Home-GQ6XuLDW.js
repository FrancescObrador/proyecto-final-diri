import{r as t,u as q,_ as v,s as p,j as e,a as N,C as b}from"./index-CMR3FlN9.js";function y(s,a){var d=s.values,n=v(s,["values"]),l=a.values,i=v(a,["values"]);return p(l,d)&&p(n,i)}function f(s){var a=q(),d=a.formatMessage,n=a.textComponent,l=n===void 0?t.Fragment:n,i=s.id,x=s.description,u=s.defaultMessage,g=s.values,c=s.children,r=s.tagName,m=r===void 0?l:r,j=s.ignoreTag,w={id:i,description:x,defaultMessage:u},o=d(w,g,{ignoreTag:j});return typeof c=="function"?c(Array.isArray(o)?o:[o]):m?t.createElement(m,null,t.Children.toArray(o)):t.createElement(t.Fragment,null,o)}f.displayName="FormattedMessage";var h=t.memo(f,y);h.displayName="MemoizedFormattedMessage";const T=({media:s})=>{const[a,d]=t.useState(!1),[n,l]=t.useState("Otros"),[i,x]=t.useState(!1),u=s.media_type==="tv"?s.name:s.title,g=s.media_type==="tv"?new Date(s.first_air_date).toLocaleDateString("es-ES",{year:"numeric"}):new Date(s.release_date).toLocaleDateString("es-ES",{year:"numeric"}),c=new Date().toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric"});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[!i&&e.jsx("div",{className:"skeleton w-12 md:w-22"}),e.jsx("img",{className:`w-12 md:w-22 rounded-xl transition-all duration-300 ${a?"brightness-50":""} ${i?"":"hidden"}`,src:`https://image.tmdb.org/t/p/w200${s.poster_path}`,onLoad:()=>x(!0)})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex flex-row items-center space-x-2",children:[e.jsx("h1",{className:"text text-xs md:text-xl font-semibold truncate",children:u}),a&&e.jsx("span",{className:"invisible md:visible badge badge-accent badge-xs md:badge-sm",children:c})]}),e.jsx("div",{className:"text uppercase font-semibold opacity-60",children:e.jsx("div",{className:"flex gap-2",children:g})}),e.jsxs("div",{className:"text uppercase font-semibold opacity-60",children:[s.vote_average.toFixed(1)," ⭐"]}),e.jsx("div",{className:"hidden md:flex space-x-1",children:s.genres.map((r,m)=>e.jsx("div",{className:"badge badge-sm badge-outline badge-secondary",children:r.name},m))})]}),e.jsxs("div",{className:"flex flex-col space-y-4",children:[e.jsxs("label",{className:"swap swap-rotate label-xs md:label-md cursor-pointer justify-end",children:[e.jsx("input",{type:"checkbox",onChange:r=>d(r.target.checked)}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"swap-on size-8 fill-current",viewBox:"0 -960 960 960",fill:"#e3e3e3",children:e.jsx("path",{d:"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"})}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"swap-off size-8 fill-current",viewBox:"0 -960 960 960",fill:"#e3e3e3",children:e.jsx("path",{d:"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"})})]}),e.jsxs("select",{className:`select cursor-pointer select-xs md:select-md w-22 md:w-auto ${a?"flex":"hidden"}`,value:n,onChange:r=>l(r.target.value),children:[e.jsx("option",{disabled:!0,value:"",children:e.jsx(h,{id:"platform"})}),e.jsx("option",{value:"Netflix",children:"Netflix"}),e.jsx("option",{value:"Amazon Prime",children:"Amazon Prime"}),e.jsx("option",{value:"HBO Max",children:"HBO Max"}),e.jsx("option",{value:"Disney+",children:"Disney+"}),e.jsx("option",{value:"Cine",children:"Cine"}),e.jsx("option",{value:"Other",children:"Otra"})]})]})]})},M=()=>{const[s,a]=t.useState([]),[d,n]=t.useState(!0),l=N(i=>i.media.media);return t.useEffect(()=>{l&&(a(l),n(!1))},[l]),e.jsx(e.Fragment,{children:d?e.jsx(b,{messages:["Writing the scripts...","Filming the movies..."]}):s.length===0?e.jsx("div",{className:"text-center p-4",children:e.jsx("p",{className:"text-xl",children:e.jsx(h,{id:"movies-empty"})})}):e.jsx("ul",{className:"list bg-base-100 rounded-box shadow-xl m-4",children:s.map(i=>e.jsx("li",{className:"list-row",children:e.jsx(T,{media:i})},i.id))})})},L=()=>e.jsx(e.Fragment,{children:e.jsx(M,{})});export{L as default};
