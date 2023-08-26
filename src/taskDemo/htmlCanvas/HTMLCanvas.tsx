import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {NDCPoint, Point, StateArray} from "../../utils/type";
import './HTMLCanvas.css'

interface HTMLCanvasProps {
    pointState: StateArray<Point[]>;
    ndcPointState: StateArray<NDCPoint[]>;
}

const RIGHT_CLICK = 3;
const LEFT_CLICK = 1;

const HTMLCanvas:React.FC<HTMLCanvasProps> = ({pointState,ndcPointState}) => {
    const [points, setPoints] = pointState ?? [];
    const [ndcPoints, setNDCPoints] = ndcPointState ?? [];
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [depth, setDepth] = useState(0);

    useEffect(() => {
        const handleContextmenu = (e: any) => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [ ])

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (event.nativeEvent.which === LEFT_CLICK) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setPoints([...points, { x, y }]);
            const vector = new THREE.Vector3(
                (event.clientX / canvas.clientWidth) * 2 - 1,
                -(event.clientY / canvas.clientHeight) * 2 + 1,
                depth
            );
            setNDCPoints([...ndcPoints, vector]);
        }
        if (event.nativeEvent.which === RIGHT_CLICK) {
            if (!depth) {
                setDepth(0.5)
            } else {
                setDepth(0)
            }
        }
    };

    const handleMouseUp = () => {
        draw();
    };

    const clearCanvas = () => {
        setDepth(0);
        setPoints([]);
        setNDCPoints([]);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0,0, canvas.width, canvas.height);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'white';
        context.lineWidth = 2;

        if (points.length >= 2) {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                context.lineTo(points[i].x, points[i].y);
            }

            context.stroke();
            context.closePath();
        }
    };

    return (
        <>
            <h4>Click to draw!</h4>
            <canvas
                ref={canvasRef}
                style={{background: 'black'}}
                width={450}
                height={500}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
            <button className='clear-canvas-btn' onClick={clearCanvas}>Clear Canvas</button>
        </>
    )
}
export default HTMLCanvas;