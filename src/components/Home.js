import React, { useState } from 'react'
import { Button, Checkbox, Drawer, Input, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { append, update,deleteWidget } from '../redux/actions/ProductActions';
import { generateUniqueId } from './utils/utils';
import Tab1 from './pages/Tab1';
import Tab4 from './pages/Tab4';
import Tab3 from './pages/Tab3';
import Tab2 from './pages/Tab2';


const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state);

    const [open, setOpen] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [addClicked, setAddClicked] = useState(false);
    const [selectedTabKey, setSelectedTabKey] = useState("1");
    const [data, setData] = useState({ title: "", content: "" });
    const [storedData, setStoredData] = useState(products.allProducts.data);
    const [renderKey, setRenderKey] = useState(Math.random());
    const [searchedText, setSearchedText] = useState({item1:"",item2:"",item3:"",item4:""})

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (key) => {
        setSelectedTabKey(key);
    };

    const handleAddWidget = () => {
        const newData = {
            ...data,
            selectedTabKey: parseInt(selectedTabKey) - 1,
            id: generateUniqueId(),
            isVisible: true
        }
        dispatch(append(newData));
        window.location.reload()
    }

    const updateVisibility = (array, rowIndex, objectId, newVisibility) => {
        if (rowIndex < 0 || rowIndex >= array.length) {
            console.error('Invalid row index');
            return;
        }

        let subArray = array[rowIndex];

        let object = subArray.find(item => item.id === objectId);

        if (object) {
            object.isVisible = newVisibility;
            setRenderKey(Math.random())
        } else {
            console.error('Object with specified ID not found');
        }
    }

    const items = [
        {
            key: '1',
            label: 'CSPM',
            children: <div>
                <p>Search Bar</p>
                <Input onChange={(e)=>{
                    setSearchedText((prevState)=>{
                        return{
                            ...prevState,
                            item1:e.target.value
                        }
                    })
                }} placeholder='Type anything to search' />
                <p>Widgets</p>
                <div key={renderKey}>
                    {
                        storedData[0] && storedData[0].map((val, ind) => {
                            return (
                                (!(searchedText.item1!=="" || searchedText!==null) || val.title.includes(searchedText.item1))?<div key={val.id} style={{ display: "flex" }}>
                                    {editClicked && <Checkbox onChange={(e) => {
                                        updateVisibility(storedData, 0, val.id, e.target.checked);
                                    }} checked={val.isVisible} />}
                                    <div>{val.title}</div>
                                </div>:<></>
                            )
                        })
                    }
                </div>
            </div>,
        },
        {
            key: '2',
            label: 'CWPP',
            children: <div>
                <p>Search Bar</p>
                <Input onChange={(e)=>{
                    setSearchedText((prevState)=>{
                        return{
                            ...prevState,
                            item2:e.target.value
                        }
                    })
                }} placeholder='Type anything to search' />
                <p>Widgets</p>
                <div key={renderKey}>
                    {
                        storedData[1] && storedData[1].map((val, ind) => {
                            return (
                                (!(searchedText.item2!=="" || searchedText!==null) || val.title.includes(searchedText.item2))?<div key={val.id} style={{ display: "flex" }}>
                                    {editClicked && <Checkbox onChange={(e) => {
                                        updateVisibility(storedData, 1, val.id, e.target.checked);
                                    }} checked={val.isVisible} />}
                                    <div>{val.title}</div>
                                </div>:<></>
                            )
                        })
                    }
                </div>
            </div>,
        },
        {
            key: '3',
            label: 'IMAGE',
            children: <div>
                <p>Search Bar</p>
                <Input onChange={(e)=>{
                    setSearchedText((prevState)=>{
                        return{
                            ...prevState,
                            item3:e.target.value
                        }
                    })
                }} placeholder='Type anything to search' />
                <p>Widgets</p>
                <div key={renderKey}>
                    {
                        storedData[2] && storedData[2].map((val, ind) => {
                            return (
                                (!(searchedText.item3!=="" || searchedText!==null) || val.title.includes(searchedText.item3))?<div key={val.id} style={{ display: "flex" }}>
                                    {editClicked && <Checkbox onChange={(e) => {
                                        updateVisibility(storedData, 2, val.id, e.target.checked);
                                    }} checked={val.isVisible} />}
                                    <div>{val.title}</div>
                                </div>:<></>
                            )
                        })
                    }
                </div>
            </div>,
        },
        {
            key: '4',
            label: 'TICKET',
            children: <div>
                <p>Search Bar</p>
                <Input onChange={(e)=>{
                    setSearchedText((prevState)=>{
                        return{
                            ...prevState,
                            item4:e.target.value
                        }
                    })
                }} placeholder='Type anything to search' />
                <p>Widgets</p>
                <div key={renderKey}>
                    {
                        storedData[3] && storedData[3].map((val, ind) => {
                            return (
                                (!(searchedText.item4!=="" || searchedText!==null) || val.title.includes(searchedText.item4))?<div key={val.id} style={{ display: "flex" }}>
                                    {editClicked && <Checkbox onChange={(e) => {
                                        updateVisibility(storedData, 3, val.id, e.target.checked);
                                    }} checked={val.isVisible} />}
                                    <div>{val.title}</div>
                                </div>:<></>
                            )
                        })
                    }
                </div>
            </div>,
        },
    ];

    const handleUpdateWidgets = () => {
        dispatch(update(storedData));
        window.location.reload();
    }

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={showDrawer}>+ Add Wigdet</Button>
                    <Drawer title="Widget Menu" onClose={onClose} open={open} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        {addClicked && <div>
                            <Input onChange={(e) => {
                                setData((prevState) => {
                                    return {
                                        ...prevState,
                                        title: e.target.value
                                    }
                                })
                            }} placeholder='Enter Title' />
                            <Input onChange={(e) => {
                                setData((prevState) => {
                                    return {
                                        ...prevState,
                                        content: e.target.value
                                    }
                                })
                            }} placeholder='Enter Content' />
                        </div>}
                        {!editClicked && !addClicked && <div><Button onClick={() => setAddClicked(true)}>+Add Widget</Button><Button onClick={() => setEditClicked(true)}>+Edit Widget</Button></div>}
                        {editClicked && <div><Button onClick={() => setEditClicked(false)}>Cancel</Button><Button onClick={handleUpdateWidgets}>Confirm</Button></div>}
                        {addClicked && <div><Button onClick={() => setAddClicked(false)}>Cancel</Button><Button onClick={handleAddWidget}>Confirm</Button></div>}
                    </Drawer>
                </div>
                <div>
                    <Tab1 />
                    <Tab2 />
                    <Tab3 />
                    <Tab4 />
                    
                </div>
            </div>

        </div>
    )
}

export default Home