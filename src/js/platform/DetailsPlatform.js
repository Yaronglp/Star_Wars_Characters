import CharacterPlatform from './CharacterPlatform';
import {fetchDataFromURLS} from '../helper/APIManipulation';

const DetailsPlatform = ({item, closeHandler, updateExposedData}) => {

    const exposeComplexProp = (propName, validateValue) => {
        fetchDataFromURLS(validateValue.split(','))
            .then(resArr => resArr.map((item) => item.name || item.title))
            .then(data => {
                updateExposedData(propName, data.join(', '));
            });
    };

    // Get properties of key/value pairs and validate it.
    // Check if value type is array and if elements include http protocol
    const propDisplayHandler = (key, value) => {
        if(value.length === 0) return 'none';

        if(value[0].startsWith('http') || value.startsWith('http')){
           let itemStr = value.constructor === Array ? value.sort().toString() : value;

           return <label onClick={(() => {
                                            let clickedCount = -1;
                                            return (() => {
                                                ++clickedCount;

                                                if(clickedCount == 0) {
                                                    exposeComplexProp(key, itemStr);
                                                }
                                            });
                                          })()}
                          className="expose">Expose
                  </label>
        }

        return value;
    };

    return <div className="details_platform">
              <button className="close_btn"
                      title="close"
                      onClick={closeHandler}>X
              </button>
              <CharacterPlatform item={item}
                                 propDisplayHandler={propDisplayHandler}/>
           </div>
};

export default DetailsPlatform;