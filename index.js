var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
let drawing = false; 

canvas.addEventListener("pointerdown", function(e) {
    drawing = true; 
    context.beginPath();
    //draw(e);
}); 

canvas.addEventListener("pointerup", function(){
    drawing = false; 
});

canvas.addEventListener("pointermove", function(e) {
    if (!drawing) return;

    var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
    let { x, y } = { 
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    }
    
    context.strokeStyle = document.getElementById("penColor").value;
    context.lineWidth = document.getElementById("lineWidth").value;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
});

document.getElementById('clear').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = document.getElementById("penColor").value;
});

document.getElementById('download').addEventListener('click', function(e) {
    let canvasURL = canvas.toDataURL(); 
    const createEl = document.createElement('a');
    createEl.href = canvasURL;
    createEl.download = "download-this-canvas"; 
    createEl.click(); 
    createEl.remove(); 
});