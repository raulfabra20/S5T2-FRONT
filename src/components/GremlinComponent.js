import React from 'react';
import happyGizmo from 'src/assets/gremlins/happyGizmo.png';

function GremlinComponent(){
  return (
     <div>
        <h2>Gizmo</h2>
        <img src ={happyGizmo} alt="Happy Gizmo" />
        <p> !Lights out! Now Gizmo is so happy!</p>
        </div>
        );
}
export default GremlinComponent;

