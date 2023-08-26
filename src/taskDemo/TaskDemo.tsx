import React, {useState} from 'react';
import HTMLCanvas from "./htmlCanvas/HTMLCanvas";
import ThreeDModel from "./threedModel/ThreeDModel";
import './TaskDemo.css'
import {NDCPoint, Point} from "../utils/type";


const DrawingCanvas: React.FC = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [ndcPoints, setNdcPoints] = useState<NDCPoint[]>([]);

    return (
        <>
            <div className="usage-information">
                <p>
                    <b>Click to draw!</b> Left-click of the mouse activates the drawing mode. Point and click at the pixels to chose
                    vertices and draw the line. Right click of the mouse sets depth for 3-d projection. Switch between depth and no-depth (2d)
                    using the right-click to draw 3d shapes like cube.
                </p>
            </div>
            <div className='model-container'>
                <div>
                    <HTMLCanvas pointState={[points, setPoints]} ndcPointState={[ndcPoints, setNdcPoints]} />
                </div>
                <div>
                    <ThreeDModel ndcPoints={ndcPoints} />
                </div>
            </div>
        </>

    );
};

export default DrawingCanvas;
