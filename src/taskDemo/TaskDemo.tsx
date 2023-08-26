import React, {useState} from 'react';
import HTMLCanvas from "./htmlCanvas/HTMLCanvas";
import ThreeDModel from "./threedModel/ThreeDModel";
import './TaskDemo.css'
import {NDCPoint, Point} from "../utils/type";


const DrawingCanvas: React.FC = () => {

    const [points, setPoints] = useState<Point[]>([]);
    const [ndcPoints, setNdcPoints] = useState<NDCPoint[]>([]);

    return (
        <div className='model-container'>
            <div>
                <HTMLCanvas pointState={[points, setPoints]} ndcPointState={[ndcPoints, setNdcPoints]} />
            </div>
            <div>
                <ThreeDModel ndcPoints={ndcPoints} />
            </div>
        </div>
    );
};

export default DrawingCanvas;
