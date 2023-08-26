import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {NDCPoint, Point, StateArray} from "../../utils/type";
import './HTMLCanvas.css'

interface HTMLCanvasProps {
    pointState: StateArray<Point[]>;
    ndcPointState: StateArray<NDCPoint[]>;
}

const RIGHT_CLICK = 2;
const LEFT_CLICK = 0;

const HTMLCanvas:React.FC<HTMLCanvasProps> = ({pointState,ndcPointState}) => {
    const [points, setPoints] = pointState ?? [];
    const [ndcPoints, setNDCPoints] = ndcPointState ?? [];
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [depth, setDepth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.height = window.innerHeight - 260;
            const ctn = document.getElementById('html-canvas-container') as HTMLDivElement;
            canvasRef.current.width = ctn.offsetWidth;
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleContextmenu = (e: any) => {
        e.preventDefault()
        e.stopPropagation();
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (event.button === LEFT_CLICK) {
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
        if (event.button === RIGHT_CLICK) {
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
        <div id='html-canvas-container'>
            <p className='two-dim-view'>2d drawing plane {depth ? '(with depth)' : ''}</p>
            <div className="canvas">
                <canvas
                    ref={canvasRef}
                    style={{background: 'black', display: 'block'}}
                    width='100%'
                    height={700}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onContextMenu={handleContextmenu}
                />
                {
                    points.length > 0 &&  <div className='vertices-container'>
                        {
                            points.map(point => {
                                return (
                                    <span key={point.x + point.y}>
                                    {
                                        `(${point.x},${point.y.toFixed(2)})`
                                    }
                                </span>
                                )
                            })
                        }
                    </div>
                }

            </div>
            <button className='clear-canvas-btn' onClick={clearCanvas}>Clear Canvas</button>
        </div>
    )
}
export default HTMLCanvas;