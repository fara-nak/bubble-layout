import React from 'react';
import classes from './styles.module.scss';

function Particle({dataLeft, dataTop, bckgrnd}) {
    return (
        <div dataLeft={dataLeft} dataTop={dataTop} className={classes["particle"]}>
            <div className={classes["particle__inner"]} style={{background: `${bckgrnd}`}}></div>
        </div>
    )
}

export default Particle;