window.onload=()=>{Array.from(document.getElementsByClassName("wp-block-onvia-blocks-piccy-gallery")).forEach((e=>{const s=Array.from(e.getElementsByClassName("thumb")),a=Array.from(e.getElementsByClassName("image-preview"));s?.[0]&&(s[0].classList.add("selected"),a[0].src=s[0].dataset.largeSize),s.forEach((s=>{s.addEventListener("click",(()=>{Array.from(e.getElementsByClassName("thumb selected")).forEach((e=>{e.classList.remove("selected")})),s.classList.add("selected"),a[0].src=s.dataset.largeSize}))}))}))};