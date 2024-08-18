import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { deleteMyWidget } from '../../redux/actions/ProductActions';

const Tab1 = memo(() => {
    const dispatch=useDispatch();
    const products = useSelector((state) => state);
    const [data, setData] = useState(products.allProducts.data);
    const [renderKey, setRenderKey] = useState(10);
    const deleteWidget=(id)=>{
        dispatch(deleteMyWidget({id,index:0}));
        setRenderKey(Math.random())
        window.location.reload()
    }
    return (
        <div >
            <h1 style={{ }}>Tab1</h1>
            <div key={renderKey} style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    data[0] && data[0].map((val, ind) => {
                        return (
                            (val.isVisible)?<div key={val.id} style={{ height: "fit-content", width: 250, border: "2px solid",boxShadow:"gray 3px 3px 11px 0px",marginRight:5 }}>
                                <div style={{display:"flex",justifyContent:"flex-end"}}><span onClick={()=>deleteWidget(val.id)} style={{marginRight:5,cursor:"pointer"}}>x</span></div>
                                <p>{val.title}</p>
                                <p>{val.content}</p>
                            </div>:<></>
                        )
                    })
                }
            </div>
        </div >
    )
})

export default Tab1