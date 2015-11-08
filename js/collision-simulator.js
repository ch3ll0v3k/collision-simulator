// ================================================================================
var _FIELD_W = 700;
var _FIELD_H = 500;

var _FIELD_CELL_W = 50;
var _FIELD_CELL_H = 50;

// -------------------------------------------------------------
var canvas;
var _ctx_R;
var _ctx_G;

var _COLL_LINE_WIDTH = 2;
var _COLL_FILL_STYLE = "#0F0";
var _COLL_STROKE_STYLE = "#0F0";

var _INFO_BOX;

// -------------------------------------------------------------
var _GRID;

var _PLAYER;
var _P_STYLE;

var _PLAYER_ELEM_X_OFFSET = 0;
var _PLAYER_ELEM_Y_OFFSET = 0;


var ALLOW_DRAG = false;

var _MOUSE_FIELD_X_OFFSET = 0;
var _MOUSE_FIELD_Y_OFFSET = 0;

var _MOUSE_ELEM_X_OFFSET = 0;
var _MOUSE_ELEM_Y_OFFSET = 0;

// -------------------------------------------------------------
var _OBST_A;
var _OBST_A_STYLE;
var _OBST_B;
var _OBST_B_STYLE;
var _OBST_C;
var _OBST_C_STYLE;

var _OBSTS = {}
// -------------------------------------------------------------

// -------------------------------------------------------------
var _DEBUG = false;
var _REDRAW_DELAY = 25;
var tTimer;
var _ALLOW_RUN = true;


var _COS_VAL = 0;
var _SIN_VAL = 0;

var _SIN_COS_STEP = 0.055;


// ================================================================================

window.addEventListener('load', function(){

    // -------------------------------------------------------------
    _INFO_BOX = __byId("_INFO_BOX");
    _INFO_BOX.innerHTML = "{ READY }";
    // -------------------------------------------------------------
    
    canvas = __byId("canvas");
    //canvas.addEventListener('mousemove', onCanvasMouseMove, false);
    _ctx_R = canvas.getContext("2d");
    _ctx_G = canvas.getContext("2d");

    //_ctx_R.font = "24px Arial red";
    //_ctx_G.font = "24px Arial red";
    
    _ctx_R.width = _FIELD_W;
    _ctx_G.width = _FIELD_W;

    _ctx_R.height = _FIELD_H;
    _ctx_G.height = _FIELD_H;

    _ctx_R.lineWidth = _COLL_LINE_WIDTH; // 3
    _ctx_G.lineWidth = _COLL_LINE_WIDTH; // 3

    _ctx_R.fillStyle = "#F00";
    _ctx_R.strokeStyle = "#F00";

    _ctx_G.fillStyle = "#0F0";
    _ctx_G.strokeStyle = "#0F0";

    // -------------------------------------------------------------
    _PLAYER = __byId("_PLAYER");
    _PLAYER.addEventListener('mousemove', onPlayerMouseMove, false);
    _PLAYER.addEventListener('mousedown', onPlayerMouseDown, false);
    _PLAYER.addEventListener('mouseup', onPlayerMouseUp, false);

    _PLAYER.W = 50;
    _PLAYER.H = 50;

    _P_STYLE = _PLAYER.style;

    _P_STYLE.width = _PLAYER.W+"px";
    _P_STYLE.height = _PLAYER.H+"px";

    _P_STYLE.marginTop = ( _FIELD_H - _PLAYER.H )+"px";
    _P_STYLE.marginLeft = ( _FIELD_CELL_W )+"px";

    _PLAYER.X_OFFSET = parseInt(_P_STYLE.marginLeft); 
    _PLAYER.Y_OFFSET = parseInt(_P_STYLE.marginTop); 


    // ------------------------------
    _OBST_A = __byId("_OBST_A");
    _OBST_A.W = 50;
    _OBST_A.H = 150;

    _OBST_A_STYLE = _OBST_A.style;

    _OBST_A_STYLE.lineHeight = _OBST_A.H+"px";
    _OBST_A_STYLE.width = _OBST_A.W+"px";
    _OBST_A_STYLE.height = _OBST_A.H+"px";
    _OBST_A_STYLE.marginLeft = ( _FIELD_CELL_W*4 )+"px";
    _OBST_A_STYLE.marginTop = ( _FIELD_H - _OBST_A.H )+"px";
    
    _OBST_A.X_OFFSET = parseInt(_OBST_A_STYLE.marginLeft); 
    _OBST_A.Y_OFFSET = parseInt(_OBST_A_STYLE.marginTop); 

    // ------------------------------
    _OBST_B = __byId("_OBST_B");
    _OBST_B.W = 100;
    _OBST_B.H = 50;

    _OBST_B_STYLE = _OBST_B.style;

    _OBST_B_STYLE.lineHeight = _OBST_B.H+"px";
    _OBST_B_STYLE.width = _OBST_B.W+"px";
    _OBST_B_STYLE.height = _OBST_B.H+"px";
    _OBST_B_STYLE.marginLeft = ( _FIELD_CELL_W*7 )+"px";
    _OBST_B_STYLE.marginTop = ( _FIELD_H - _OBST_B.H )+"px";
    
    _OBST_B.X_OFFSET = parseInt(_OBST_B_STYLE.marginLeft); 
    _OBST_B.Y_OFFSET = parseInt(_OBST_B_STYLE.marginTop); 

    // ------------------------------
    _OBST_C = __byId("_OBST_C");
    _OBST_C.W = 50;
    _OBST_C.H = 200;

    _OBST_C_STYLE = _OBST_C.style;

    _OBST_C_STYLE.lineHeight = _OBST_C.H+"px";
    _OBST_C_STYLE.width = _OBST_C.W+"px";
    _OBST_C_STYLE.height = _OBST_C.H+"px";
    _OBST_C_STYLE.marginTop = ( _FIELD_H - _OBST_C.H )+"px";
    _OBST_C_STYLE.marginLeft = ( _FIELD_CELL_W*11 )+"px";
    
    _OBST_C.X_OFFSET = parseInt(_OBST_C_STYLE.marginLeft); 
    _OBST_C.Y_OFFSET = parseInt(_OBST_C_STYLE.marginTop); 

    // -------------------------------------------------------------
    //_B_LAYER = __byId("_B_LAYER");
    //_B_LAYER.addEventListener('mousemove', onGridMouseMove, false);
    //_B_LAYER.addEventListener('mousedown', onGridMouseDown, false);
    
    // -------------------------------------------------------------
    _GRID = __byId("grid-box");
    _GRID.addEventListener('mousemove', onGridMouseMove, false);
    //_GRID.addEventListener('click', onGridClick, false);
    _GRID.addEventListener('mousedown', onGridMouseDown, false);
    _GRID.addEventListener('mouseup', onGridMouseUp, false);

    var grid_box_cells_holder = __byId('grid-box-cells-holder');
    /**/
    for (var y=0; y < (_FIELD_H/50); y++ ) {
        

        for (var x=0; x < (_FIELD_W/50); x++ ) {

            var elem = __newElem('div');
                elem.className = 'grid-cell';

            // Extra colored lines
            
            if(y == 7 || y == 3){
                elem.style.borderTop = 'dashed 1px blue';
                elem.style.marginTop = '-1px';
            }

            if(y == 5){
                elem.style.borderTop = 'dashed 1px #0F0';
                elem.style.marginTop = '-1px';
            }

            if(x == 7){
                elem.style.borderLeft = 'dashed 1px red';
                elem.style.marginLeft = '-1px';
            }
            

            grid_box_cells_holder.appendChild(elem);
        }
    };
    /**/
    // -------------------------------------------------------------
    _OBSTS = {
        'A' : _OBST_A, 
        'B' : _OBST_B, 
        'C' : _OBST_C
    };
    // -------------------------------------------------------------
    /*
    _ctx.moveTo(0, 0); 
    _ctx.lineTo( _FIELD_W, _FIELD_H ); 
    _ctx.stroke();
    */
    // -------------------------------------------------------------
    _resetAllValues();
    //_runner();
    // -------------------------------------------------------------

});

// ================================================================================
function _changeBahevier(){

    // -------------------------------------------------------------
    if(_ALLOW_RUN){
        _start();
    }else{

        _stop();
    }
    // -------------------------------------------------------------
}
// ================================================================================
function _runner(){

    // -------------------------------------------------------------
    clearTimeout(tTimer);
    // -------------------------------------------------------------
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    // LOOOP
    //_ctx_R.stroke();
    //_ctx_G.stroke();

    _clear();
    // ----------------------------------------------------------------------------
    var _P_X = (_FIELD_W/2) - (Math.sin(_SIN_VAL) * (_FIELD_W/3.4) ) - (_PLAYER.W/2);
    var _P_Y = (_FIELD_H/2) - (Math.cos(_COS_VAL) * (_FIELD_H/3.4) ) - (_PLAYER.H/2) / 2;


    _COS_VAL += Math.random(0.0001, Math.random(0.0001, 0.01))/24; 
    _SIN_VAL += Math.random(0.0001, Math.random(0.0001, 0.01))/18; 


    _INFO_BOX.innerHTML = '<span style="color: red;">{</span> '+_P_X.toString().substr(0, 6)+' : '+_P_Y.toString().substr(0, 6)+'<span style="color: red;"> }</span> ';

    _P_STYLE.marginLeft = (_P_X)+"px";
    _P_STYLE.marginTop = (_P_Y)+"px";






    // ----------------------------------------------------------------------------
    _PLAYER.X_OFFSET = parseInt(_P_STYLE.marginLeft);
    _PLAYER.Y_OFFSET = parseInt(_P_STYLE.marginTop);

    for(var _elem in _OBSTS ){

        // ------------------------------------------------------------------------
        // Get X-Collision    
        if(
            _PLAYER.X_OFFSET+_PLAYER.W >= _OBSTS[_elem].X_OFFSET
            &&
            _PLAYER.X_OFFSET+_PLAYER.W <= _OBSTS[_elem].X_OFFSET+_OBSTS[_elem].W
        ){
            
            _DRAW_rect( _ctx_R, _PLAYER.X_OFFSET+_PLAYER.W, 0, _COLL_LINE_WIDTH, _FIELD_H, "rgba(255,0,0, 1)" );
            // hit horizontal-line on the top of element
            _DRAW_rect( _ctx_R, 0, _OBSTS[_elem].Y_OFFSET, _FIELD_W, _COLL_LINE_WIDTH, "rgba(255,0,0, 1)" );
            // hit horizontal-line on the bottom of moving element
            _DRAW_rect( _ctx_R, 0, _PLAYER.Y_OFFSET+_PLAYER.H, _FIELD_W, _COLL_LINE_WIDTH, "rgba(255,0,0, 1)" );


        }else if(
            _OBSTS[_elem].X_OFFSET+_OBSTS[_elem].W >= _PLAYER.X_OFFSET
            &&
            _OBSTS[_elem].X_OFFSET <= _PLAYER.X_OFFSET+_PLAYER.W
        ){

            _DRAW_rect( _ctx_G, _PLAYER.X_OFFSET, 0, _COLL_LINE_WIDTH, _FIELD_H, "rgba(0,255,0, 1)" );
            // hit horizontal-line on the top of element
            _DRAW_rect( _ctx_R, 0, _OBSTS[_elem].Y_OFFSET, _FIELD_W, _COLL_LINE_WIDTH, "rgba(0,255,0, 1)" );
            // hit horizontal-line on the bottom of moving element
            _DRAW_rect( _ctx_R, 0, _PLAYER.Y_OFFSET+_PLAYER.H, _FIELD_W, _COLL_LINE_WIDTH, "rgba(0,255,0, 1)" );


        }

        // ------------------------------------------------------------------------
        // Get Y-Collision
        if(_PLAYER.X_OFFSET+_PLAYER.W >= _OBSTS[_elem].X_OFFSET){
            //__log('HIT-BY: Y')
        }


        // ------------------------------------------------------------------------
    }

    /*

    _DRAW_rect(_ctx_R, 25, 25, 200, 200, "rgba(255,0,0, 0.3)");
    _DRAW_rect(_ctx_G, 50, 50, 225, 225, "rgba(0,255,0, 0.3)");

    _DRAW_line(_ctx_R, 0, 0, _FIELD_W, _FIELD_H, "rgba(255,0,0, 0.3)");

    _DRAW_line(_ctx_G, 0, _FIELD_H, _FIELD_W, 0, "rgba(0,255,0, 0.3)");

    */

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    if(_ALLOW_RUN)
        tTimer = setTimeout(function(){
            //_clear();
            _runner();
        }, _REDRAW_DELAY);
    // -------------------------------------------------------------

}

// ================================================================================
function OBST_mouseDown(_this_elem, _evt, _alpha){
    // -------------------------------------------------------------
    // -------------------------------------------------------------
}
// ================================================================================
function OBST_mouseUp(_this_elem, _evt, _alpha){
    // -------------------------------------------------------------
    // -------------------------------------------------------------
}
// ================================================================================
function OBST_mouseMove(_this_elem, _evt, _alpha){
    // -------------------------------------------------------------
    // -------------------------------------------------------------
}
// ================================================================================
function OBST_click(_this_elem, _evt, _alpha){
    
    // -------------------------------------------------------------
    

    __log(_alpha+':-> '+_OBSTS[_alpha].W+':'+_OBSTS[_alpha].H);
    //__log(_alpha+': '+_evt.target.id);
    
    // -------------------------------------------------------------
    if(_DEBUG){
        __log(_alpha+': '+_evt.target.id);
    }
    // -------------------------------------------------------------
}

// ================================================================================
function onGridMouseUp(_evt){

    // -------------------------------------------------------------
    ALLOW_DRAG = false; //__log('onGridMouseUp: ALLOW_DRAG = '+ALLOW_DRAG)
    // -------------------------------------------------------------
}
// ================================================================================
function onGridMouseDown(_evt){

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    if(_DEBUG){
        __log('G->D: '+_evt.clientX+':'+_evt.clientY+' | '+_evt.layerX+':'+_evt.layerY);
    }
    // -------------------------------------------------------------
}

// ================================================================================
function onGridMouseMove(_evt){

    // -------------------------------------------------------------
    /*
    var parEl = _evt.target;
    __log(
        'G: '
        +'client: {'+_evt.clientX+':'+_evt.clientY+'}, '
        +'layer: {'+_evt.layerX+':'+_evt.layerY+'}, '
        +'screen: {'+_evt.screenX+':'+_evt.screenY+'}, '
        +'mozMovementX: {'+_evt.mozMovementX+':'+_evt.mozMovementY+'}, '
        +'page: {'+_evt.pageX+':'+_evt.pageY+'}, '
        / *
        +'offsetXY: {'+parEl.offsetX+':'+parEl.offsetY+'}, '
        +'offsetLT: {'+parEl.offsetLeft+':'+parEl.offsetTop+'}, '
        +'offsetParent: {'+parEl.offsetParent+'}, '
        * /
    );
    */
    // -------------------------------------------------------------
    if( !ALLOW_DRAG ){ 
        return; 
    }
    // -------------------------------------------------------------
    _P_STYLE.marginLeft = (_evt.clientX - _PLAYER.W - _MOUSE_ELEM_X_OFFSET)+'px';
    _P_STYLE.marginTop = (_evt.clientY - _PLAYER.H - _MOUSE_ELEM_Y_OFFSET)+'px';

    // -------------------------------------------------------------
    if(_DEBUG){
        __log('G->M: '+_evt.clientX+':'+_evt.clientY+' | '+_evt.layerX+':'+_evt.layerY);
        var rect = _GRID.getBoundingClientRect(); console.log(rect.top, rect.right, rect.bottom, rect.left);
    }
    // -------------------------------------------------------------
}

// ================================================================================
function onPlayerMouseDown(_evt){

    // -------------------------------------------------------------
    ALLOW_DRAG = true;
    // -------------------------------------------------------------
    _MOUSE_ELEM_X_OFFSET = _evt.layerX;
    _MOUSE_ELEM_Y_OFFSET = _evt.layerY;

    //_PLAYER_ELEM_X_OFFSET = parseInt(_P_STYLE.marginLeft);
    //_PLAYER_ELEM_Y_OFFSET = parseInt(_P_STYLE.marginTop);
    
    //__log(' _PLAYER: '+parseInt(_P_STYLE.marginLeft)+':'+parseInt(_P_STYLE.marginTop));    
    // -------------------------------------------------------------
    if(_DEBUG){
        //__log(this.id);
        __log('G->M: '+_evt.clientX+':'+_evt.clientY+' | '+_evt.layerX+':'+_evt.layerY);
        __log('onPlayerMouseUp: ALLOW_DRAG = '+ALLOW_DRAG)
    }
    // -------------------------------------------------------------
}

// ================================================================================
function onPlayerMouseMove(_evt){

    // -------------------------------------------------------------
    if( !ALLOW_DRAG ){ 
        return; 
    }
    // -------------------------------------------------------------
    if(_DEBUG){
        __log('G->M: '+_evt.clientX+':'+_evt.clientY+' | '+_evt.layerX+':'+_evt.layerY);
    }
    // -------------------------------------------------------------
}

// ================================================================================
function onPlayerMouseUp(_evt){

    // -------------------------------------------------------------
    ALLOW_DRAG = false;
    // -------------------------------------------------------------
    if(_DEBUG){
        __log('onPlayerMouseUp: ALLOW_DRAG = '+ALLOW_DRAG)
    }
    // -------------------------------------------------------------

}

// ================================================================================
function _clear(){

    // -------------------------------------------------------------
    //__log(Math.random(0, 23))
    // Reset all
    //_ctx.save();
    //_ctx.setTransform(1, 0, 0, 1, 0, 0);
    _ctx_R.clearRect(0, 0, _FIELD_W, _FIELD_H);
    _ctx_G.clearRect(0, 0, _FIELD_W, _FIELD_H);
    //_ctx.clearRect(0, 0, _ctx.width, _ctx.height);
    //_ctx.restore();
    // -------------------------------------------------------------
}

// ================================================================================
function _resetAllValues(){

    // -------------------------------------------------------------
    //__byId("").innerHTML = '';
    // -------------------------------------------------------------
}

// ================================================================================
function _start(){

    // -------------------------------------------------------------
    _ALLOW_RUN = true;

    __byId('_start_btn').style.display = 'none'; 
    __byId('_stop_btn').style.display = 'block'; 


    // -------------------------------------------------------------
    tTimer = setTimeout(function(){
        _runner();
    }, 10);
    // -------------------------------------------------------------
}

// ================================================================================
function _stop(){

    // -------------------------------------------------------------
    _ALLOW_RUN = false;
    __byId('_stop_btn').style.display = 'none'; 
    __byId('_start_btn').style.display = 'block'; 

    // -------------------------------------------------------------
}

// ================================================================================
function _DRAW_rect(_this_ctx, _FROM_X, _FROM_Y, _TO_X, _TO_Y, _COLOR){

    // -------------------------------------------------------------
    _this_ctx.strokeStyle = _COLOR;
    _this_ctx.fillStyle = _COLOR;


    _this_ctx.fillRect(_FROM_X, _FROM_Y, _TO_X, _TO_Y);
    _this_ctx.stroke();

    /*
    _this_ctx.moveTo( _X, _Y); 
    _this_ctx.lineTo( _X+1, _Y+1 ); 
    */
    // -------------------------------------------------------------
}

// ================================================================================
function _DRAW_line(_this_ctx, _FROM_X, _FROM_Y, _TO_X, _TO_Y, _COLOR){

    // -------------------------------------------------------------
    _this_ctx.strokeStyle = _COLOR;
    _this_ctx.fillStyle = _COLOR;
    
    _this_ctx.moveTo( _FROM_X, _FROM_Y ); 
    _this_ctx.lineTo( _TO_X, _TO_Y ); 
    _this_ctx.stroke();

    // -------------------------------------------------------------
}
// ================================================================================
// ================================================================================
