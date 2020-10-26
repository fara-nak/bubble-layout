import React from 'react';
import classes from './styles.module.scss'

function BlobCircleEllipse({cx, cy, rx, ry}) {
    return (
        <svg className={classes["sprite__frame"]}>
            <ellipse rx={rx} ry={ry} cx={cx} cy={cy} fill="none" className={classes["sprite__ellipse"]}></ellipse>
        </svg>
    )
}

export default BlobCircleEllipse;