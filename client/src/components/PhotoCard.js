
const PhotoCard = () => {
    return (
      <div>
          <div className = "row">
            <div className="column">
                <div className="photo">
                    <img src="https://galapagosconservation.org.uk/wp-content/uploads/2015/11/Galapagos-Penguin-%C2%A9-GCT.jpg" alt="Diva"  height="150px" />
                </div>
                <div className="text">
                    Diva, Galapagos Penguin
                </div>

                <div className="photo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/Spheniscus_mendiculus_juvenile.jpg" alt="Skipper" height="150px" />
                </div>
                <div className="text">
                    Skipper, Galapagos Penguin
                </div>

            </div>

            <div className="column">
                <div className="photo">
                    <img src="https://files.worldwildlife.org/wwfcmsprod/images/Atlantic_bluefin_tuna_253467_Tuna_Species/hero_small/925cryk2za_Bluefin_tuna_253467.jpg" alt="Elsa" height="150px" />
                </div>
                <div className="text">
                    Elsa, Blufin Tuna
                </div>

                <div className="photo">
                    <img src="https://europe.oceana.org/sites/default/files/euo/EUO_c_OCEANA_Keith_Ellenbogen_22296.jpg" alt="Olaf" height="150px"  />
                </div>
                <div className="text">
                    Olaf, Blufin Tuna
                </div>
            </div>

            <div className="column">
                <div className="photo">
                    <img src="https://img.jakpost.net/c/2020/07/25/2020_07_25_100945_1595646234._large.jpg" alt="Ginger" height="150px"  />
                </div>
                <div className="text">
                    Ginger, Sunda Tiger
                </div>

                <div className="photo">
                    <img src="https://thumbs.dreamstime.com/b/tiger-big-lying-sleeping-his-lair-38892583.jpg" alt="Ninja" height="150px"  />
                </div>
                <div className="text">
                    Ninja, Sunda Tiger
                </div>
            </div>

        </div>
      </div>
    );
  };
  
export default PhotoCard;
  

