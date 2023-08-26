import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {Line} from "@react-three/drei";
import {NDCPoint} from "../../utils/type";

interface LineGroupProps {
    ndcPoints: NDCPoint[];
}

const LineGroup: React.FC<LineGroupProps> = ({ndcPoints}) => {
    const groupRef = useRef<THREE.Group | null>(null);
    useFrame(({clock, mouse}) => {
        if (!groupRef.current ) return;
        if (ndcPoints.length < 1) return;
        groupRef.current.rotation.set(mouse.x, mouse.y, 0);
    })
    return (
        <group ref={groupRef}>
            {ndcPoints.length >= 2 && <Line points={ndcPoints.map((point) => [point.x, point.y, point.z])} color={'white'} />}
        </group>
    )
}

export default LineGroup;