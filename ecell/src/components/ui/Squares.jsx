import { useRef, useEffect } from 'react';
import './Squares.css';

const Squares = ({
    direction = 'right',
    speed = 1,
    borderColor = '#999',
    squareSize = 40,
    hoverFillColor = '#222',
    className = ''
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const numSquaresX = useRef();
    const numSquaresY = useRef();
    const gridOffset = useRef({ x: 0, y: 0 });
    const hoveredSquares = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            // Draw Grid Lines
            ctx.lineWidth = 1;
            for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
                for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
                    const squareX = x - (gridOffset.current.x % squareSize);
                    const squareY = y - (gridOffset.current.y % squareSize);

                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }

            // Draw Hovered Squares (Trail)
            hoveredSquares.current.forEach(square => {
                const squareX = square.x * squareSize - (gridOffset.current.x % squareSize) + startX;
                const squareY = square.y * squareSize - (gridOffset.current.y % squareSize) + startY;

                // Only draw if opacity is significant
                if (square.opacity > 0) {
                    ctx.fillStyle = hoverFillColor;
                    ctx.globalAlpha = square.opacity;
                    ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    ctx.globalAlpha = 1; // Reset alpha
                }
            });

            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
            );
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAnimation = () => {
            // Move grid
            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case 'right':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'left':
                    gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'up':
                    gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'down':
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                case 'diagonal':
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                default:
                    break;
            }

            // Decay opacity of hovered squares
            hoveredSquares.current = hoveredSquares.current
                .map(sq => ({ ...sq, opacity: sq.opacity - 0.02 })) // Fade speed
                .filter(sq => sq.opacity > 0);

            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        const handleMouseMove = event => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x % squareSize) / squareSize);
            const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y % squareSize) / squareSize);

            // Check if this square is already in the list to avoid duplicates/flicker
            const existingSquareIndex = hoveredSquares.current.findIndex(
                sq => sq.x === hoveredSquareX && sq.y === hoveredSquareY
            );

            if (existingSquareIndex !== -1) {
                // Reset opacity if already exists
                hoveredSquares.current[existingSquareIndex].opacity = 1;
            } else {
                // Add new square
                hoveredSquares.current.push({ x: hoveredSquareX, y: hoveredSquareY, opacity: 1 });
            }
        };

        const handleMouseLeave = () => {
            // Optional: clear trail immediately? No, let it fade.
            // hoveredSquares.current = [];
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [direction, speed, borderColor, hoverFillColor, squareSize]);

    return <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>;
};

export default Squares;
