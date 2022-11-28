import { Button, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'


const categories = [
    "Cap",
    "Renda familiar mitjana",
    "Consum total diari",
    "Nivell d'educació",
    "....",
    "....",
    "....",
    "....",
    "....",
    "....",
    "....",
    "....",
    "....",
]
const clickable = [
    "Cap",
    "Renda familiar mitjana",
    "Consum total diari",
]

const FiltreCategoria = (props) => {


    let [selected, setSelected] = useState("Cap")
    let [listHidden, setListHidden] = useState(true);

    let rendaFilter = () => {
        const minDistance = 2000;
        const [value1, setValue1] = useState(props.maxRentaRange);
        const [changedValue, setChangedValue] = useState(props.maxRentaRange)

        const handleChange1 = (event, newValue, activeThumb) => {
            if (!Array.isArray(newValue)) {
                return;
            }

            if (activeThumb === 0) {
                setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            } else {
                setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            }
        };
        return (
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2,
                marginBottom: 15,
                marginLeft: 5,
                display: selected === "Renda familiar mitjana" ? "block" : "none",
                transitionDuration: 2000,
            }}>
                <Slider
                    size="small"
                    value={value1}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={props.maxRentaRange[0]}
                    max={props.maxRentaRange[1]}
                    onChangeCommitted={(event, newValue) => setChangedValue(newValue)}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => props.filterByRenta(changedValue)}

                >aplicar</Button>

            </div>
        )
    }

    return (
        <div style={{
            marginTop: 2,
            marginBottom: 15,
        }}>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                marginBottom: 5,
            }}>
                Filtre categòric
            </Typography>
            <div>
                <div style={{
                    paddingLeft: 5,
                    paddingRight: 20,
                    backgroundColor: "whitesmoke",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
                    onClick={() => setListHidden(!listHidden)}
                >
                    <Typography variant='body1' style={{
                    }}>
                        {selected}
                    </Typography>
                </div>
                <div style={{
                    height: listHidden ? "0px" : "200px",
                    width: "80%",
                    position: "absolute",
                    backgroundColor: "whitesmoke",
                    marginTop: 5,
                    zIndex: 2000,
                    transitionDuration: "0.2s",
                    borderRadius: "4px",
                    transitionProperty: "height",
                    overflowY: "scroll",
                    // padding: 10,
                }}>
                    {categories.filter(c => c !== selected).map(c => <Typography variant="body1" style={{
                        marginTop: 4,
                        marginLeft: 5,
                        cursor: clickable.includes(c) ? "pointer" : null,
                        color: clickable.includes(c) ? "rbg(112,112,112)" : "rgb(200,200,200)"
                    }}
                        className="hoverwhite"
                        onClick={() => {
                            if (clickable.includes(c)) {
                                setListHidden(true)
                                setSelected(c)
                            }
                        }}
                    >{c}</Typography>)}
                </div>
                {rendaFilter()}
            </div>
        </div >
    )
}

export default FiltreCategoria