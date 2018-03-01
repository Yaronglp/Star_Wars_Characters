const CharacterPlatform = ({item, propDisplayHandler}) => {
    const {name,
           height,
           mass,
           hair_color,
           skin_color,
           eye_color,
           birth_year,
           gender,
           vehicles,
           starships,
           homeworld,
           films,
           species} = item;

    const propMap = new Map([
            ['Height', height],
            ['Mass', mass],
            ['Hair color', hair_color],
            ['Skin color', skin_color],
            ['Eye color', eye_color],
            ['Birth year', birth_year],
            ['Gender', gender],
            ['Vehicles', vehicles],
            ['Starships', starships],
            ['Homeworld', homeworld],
            ['Films', films],
            ['Species', species]
        ]);

    let labelArr = [];

    for(let [key, value] of propMap){
        let validateValue = propDisplayHandler(key.toLowerCase(), value);

        labelArr.push(<label title={typeof validateValue === 'string' ? validateValue : null}
                             className="truncate"
                             key={key}><b>{key}: </b>{validateValue}
                      </label>);
    }

    return (
        <div className="character_platform">
            <h3 className="truncate">{name}</h3>
            {labelArr}
        </div>
    );
};

export default CharacterPlatform;