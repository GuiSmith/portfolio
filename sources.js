export function setContent(query, attribute, value){
  const element = document.querySelector(query);
  element.setAttribute(attribute,value);
}