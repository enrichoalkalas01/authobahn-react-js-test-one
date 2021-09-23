import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/style.css'
import { useState } from 'react'
import * as JSONData from './data.json'
import Chart from './Components/Chart'

const App = (props) => {
    const [tabMenu , setTabMenu] = useState(0)
    const [listChange, setListChange] = useState(-1)
    const [byNumber, setByNumber] = useState(0)
    
    // console.log(JSONData.default)
    console.log(byNumber)
    // console.log(listChange)

    return(
        <section id="app-test">
            <div className="main-content">
                <div className="box-content title">
                    <div className="content title-box">
                        <h1>Vulnerability Data</h1>
                    </div>
                </div>
                <div className="box-content">
                    <div className="wrapper-content left">
                        <div className="content menu-box">
                            <ul>
                                { 
                                    JSONData.default.map((data, index) => {
                                        return(
                                            <li className={ index === tabMenu ? "menu active" : "menu" }
                                                key={ index }
                                                onClick={ () => setTabMenu(index) }
                                            >
                                                { `Tab #${ index + 1 }` }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="content content-data">
                            <h1>This graphs show that : </h1>
                            <div className="content-box">
                                {
                                    JSONData.default[tabMenu].bullets.map((data, index) => {
                                        return(
                                            <div 
                                                className="wrapper-content-d"
                                                key={ index }
                                            >
                                                <div className="icon-box">
                                                    <i className={ `fas ${ data.icon }` }></i>
                                                </div>
                                                <div className="desc-box">
                                                    <div dangerouslySetInnerHTML={{ __html: data.text }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-content right">
                        <div className="content cart-box">
                            <h4>{ `Chart ${ tabMenu + 1 }` }</h4>
                            <Chart
                                DataChart={ JSONData.default[tabMenu] }
                            />
                        </div>
                        <div className="content list-box">
                            <div className="wrapper-one">
                                <select onChange={ e => { setListChange(e.target.value) } }>
                                    <option default value={ -1 }>Show All Data</option>
                                    {
                                        JSONData.default[tabMenu].list.map((data, index) => {
                                            return(
                                                <option key={ index } value={ index }>{ data.name }</option>     
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="wrapper-two">
                                <label>With a score above</label>
                                <input 
                                    type="number"
                                    placeholder="change by number.."
                                    onChange={ e => { setByNumber(Number(e.target.value)) } }
                                />
                            </div>
                        </div>
                        <div className="content list-wrapper-box">
                            <table>
                                <thead>
                                    <tr className="head">
                                        <td>Name</td>
                                        <td>Score</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    // If list change and number is empty
                                    ( listChange >= 0 && byNumber === 0 ) || ( listChange >= 0 && byNumber !== 0 )  ?
                                        // 'list change but bynumber empty'
                                        listChange >= 0 ? 
                                            // list change but by number not change
                                            byNumber === 0 ?
                                                <tr className="data-list">
                                                    <td>{ JSONData.default[tabMenu].list[listChange].name }</td>
                                                    <td>{ JSONData.default[tabMenu].list[listChange].score }</td>
                                                </tr>
                                            :
                                            // List change but by number change
                                            JSONData.default[tabMenu].list.map((data, index) => {
                                                if ( Number(data.score) === Number(byNumber) ) {
                                                    return(
                                                        <tr key={ index } className="data-list">
                                                            <td>{ data.name }</td>
                                                            <td>{ data.score }</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        :
                                            JSONData.default[tabMenu].list.map((data, index) => {
                                                return(
                                                    <tr key={ index } className={
                                                        index !== ( JSONData.default[tabMenu].list.length - 1) ?
                                                        "data-list" : "data-list last-child"
                                                    }>
                                                        <td>{ data.name }</td>
                                                        <td>{ data.score }</td>
                                                    </tr>
                                                )
                                            })
                                            
                                    :
                                        // byNumber change but list not change
                                        byNumber !== 0 ? 
                                            // 'by number change'
                                            JSONData.default[tabMenu].list.map((data, index) => {
                                                if ( Number(data.score) === Number(byNumber) ) {
                                                    return(
                                                        <tr key={ index } className="data-list">
                                                            <td>{ data.name }</td>
                                                            <td>{ data.score }</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                            
                                        :
                                            // 'list not change but bynumber not change'
                                            JSONData.default[tabMenu].list.map((data, index) => {
                                                return(
                                                    <tr key={ index } className={
                                                        index !== ( JSONData.default[tabMenu].list.length - 1) ?
                                                        "data-list" : "data-list last-child"
                                                    }>
                                                        <td>{ data.name }</td>
                                                        <td>{ data.score }</td>
                                                    </tr>
                                                )
                                            })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default App