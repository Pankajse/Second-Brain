import { useEffect } from 'react';
function useOnClickOutside(ref : any , handler : (event:any)=>void) {
useEffect(() => {
const listener = (event : any) => {
// Do nothing if clicking ref's element or descendent elements
if (!ref.current || ref.current.contains(event.target)) {
return;
}
// Call the handler if the click is outside the element
handler(event);
};
// Bind the event listener
document.addEventListener('mousedown', listener);
document.addEventListener('touchstart', listener);
// Cleanup the event listener on unmount
return () => {
document.removeEventListener('mousedown', listener);
document.removeEventListener('touchstart', listener);
};
}, [ref, handler]);
}
export default useOnClickOutside;