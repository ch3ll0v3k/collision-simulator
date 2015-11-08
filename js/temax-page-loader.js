/* ================================================================== */
window.addEventListener('load',function(){

    // -------------------------------------------------------------
    // Page Loader
    __byId('page_loader_bol').style.display = 'none'; 
    __byId('page_loader_box').style.display = 'none'; 
    __byId('app-main-box').style.display = 'block';
    
    // -------------------------------------------------------------
    if(!settings.display.background){
        document.body.style.backgroundImage = 'none';
    }
    // -------------------------------------------------------------

});
/* ================================================================== */
