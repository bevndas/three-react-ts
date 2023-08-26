import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import LineGroup from "../threedModel/LineGroup";
import React from "react";
import {NDCPoint} from "../../utils/type";
import './ThreedModel.css';

interface ThreeDModelProps {
    ndcPoints: NDCPoint[];
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({ndcPoints}) => {
    return (
        <>
            <p className='three-dim-view'>3d Preview Plane</p>
            <Canvas style={{ background: 'black', maxHeight: 'calc(100vh - 260px)', maxWidth: '100%'}} camera={{ fov: 75, near: 0.1, far: 10000, position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <LineGroup ndcPoints={ndcPoints} />
            </Canvas>
        </>

    )
}
export default ThreeDModel;