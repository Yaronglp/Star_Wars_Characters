import {Component} from 'react';
import {fetchDataFromURL} from './helper/APIManipulation';
import * as LS from './helper/LocalStorage';
import SearchPlatform from './platform/SearchPlatform';
import DetailsPlatform from './platform/DetailsPlatform';
import Loader from './component/Loader';
import {sortArrayOfObject} from './helper/Utils';
import '../css/Style.css';

class App extends Component{
    constructor(){
        super();
        this.state = {
            characters:[],
            character:{
                data:null,
                show:false
            },
            isLoading:true
        };
        this.showCharacterInfo = this.showCharacterInfo.bind(this);
        this.hideCharacterInfo = this.hideCharacterInfo.bind(this);
        this.updateExposedData = this.updateExposedData.bind(this);
        this.appTitle = 'Star Wars Characters';
        this.apiURL = 'https://swapi.co/api/people/';
        this.localStorageKey = 'Star_Wars_Characters';
    }

    componentWillMount(){
        let lsItem = LS.getData(this.localStorageKey);

        if(lsItem){
            this.setState({
                isLoading:false,
                characters:lsItem

            });
        }
        else {
            fetchDataFromURL(this.apiURL)
                .then((arr) => {
                    arr = sortArrayOfObject(arr,'name');
                    this.setState({
                        isLoading: false,
                        characters: arr
                    });
                    LS.saveData(this.localStorageKey, arr);
                })
                .catch((err) => {
                    throw new Error(err.message);
                });
        }
    }

    showCharacterInfo(info){
        this.setState({
            character:{
                data:info,
                show:true
            }
        });
    }

    hideCharacterInfo() {
        this.setState({
            character:{
                show:false
            }
        });
    }

    updateExposedData(propName, propValue){
        let {characters, character} = this.state;
        let characterIndex = -1;

        for(let i = 0; i < characters.length; ++i){
            if(character.data === characters[i]){
                characterIndex = i;
                break;
            }
        }

        characters[characterIndex][propName] = propValue;
        this.setState({
            characters
        });
        LS.saveData(this.localStorageKey, characters);
    }

    render(){
        const {characters, character, isLoading} = this.state;

        return <React.Fragment>
                   <div className="app_title">{this.appTitle}</div>
                   {isLoading === true ?
                       <Loader/>
                       :
                       <div className="main">
                          {character.show === false ?
                              <SearchPlatform items={characters}
                                              clickHandler={this.showCharacterInfo}/>
                              :
                              <DetailsPlatform item={character.data}
                                               closeHandler={this.hideCharacterInfo}
                                               updateExposedData={this.updateExposedData}/>}
                       </div>
                   }
              </React.Fragment>
    }
}

export default App;