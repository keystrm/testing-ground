document.addEventListener('DOMContentLoaded', function() {
    const svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 500 500");

    // Generate a 10x10 grid
    function generateGrid(rows, cols, cellSize) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("x", j * cellSize);
                rect.setAttribute("y", i * cellSize);
                rect.setAttribute("width", cellSize);
                rect.setAttribute("height", cellSize);
                rect.setAttribute("fill", "grey");
                rect.setAttribute("stroke", "black");

                // Adding an animation to change fill color
                let animate = document.createElementNS(svgNS, "animate");
                animate.setAttribute("attributeName", "fill");
                animate.setAttribute("values", "grey;red;grey");
                animate.setAttribute("dur", "2s");
                animate.setAttribute("repeatCount", "indefinite");
                
                rect.appendChild(animate);
                svg.appendChild(rect);
            }
        }
    }

    generateGrid(10, 10, 50); // 10x10 grid with 50x50 cells
    document.getElementById("svgContainer").appendChild(svg);

    // Function to export the SVG
    document.getElementById("exportBtn").addEventListener("click", function() {
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svg);
        var blob = new Blob([svgString], {type: "image/svg+xml"});
        var url = URL.createObjectURL(blob);

        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "animated_grid.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});
