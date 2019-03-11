const MakeAndModel = () => {
    const [hiden, setVisibility ] = React.useState(true);
    const [makers, setMakers ] = React.useState({});
    const [showCancel, setshowCance] = React.useState(false);
    const [cancel, setCancel] = React.useState(false);
  
    const [models, setModels ] = React.useState({});
    const [ttm, setTTM] = React.useState(false);
    const [back, setBack] = React.useState(false);
    const [activeMaker, setActiveMaker] = React.useState('Make & Model Search');
    
    
    const getMakers = () => {
      $.get('/apis/widget/INDEX:inventory-search4/getFacets?referrer', function(response) {
        let onlyMakers = response.facets.filter(data => data.id === 'make')[0];
        setMakers(onlyMakers);
        setshowCance(true);
      });
    }
    
    const cancelSearch = () => {
      setCancel(true)
      setshowCance(false);
    }
  
    const goBack = () => {
      setBack(true);
      setTTM(false);
      setActiveMaker('Make & Model Search');
    }
  
    const getModels = (e) => {
      e.persist()
      let selection = e.target;
      $.get(`/apis/widget/INDEX:inventory-search4/getFacets?make=${ selection.innerText }.json`, function(response) {
        let onlyModels = response.facets.filter((data, idx) => data.id === 'model')[0];
        setModels(onlyModels);
        setTTM(true);
        setActiveMaker(selection.innerText);
        setBack(false);
      });
    }
  
    const Makers = (props) => (
      <React.Fragment>
        <div className='overlay'></div>
        <div className={`lists-container ${ ttm && !back ? 'list-transition' : '' } ${ !ttm && back ? 'back-transition' : '' }`}>
          <ul className='makers-list'>
            { 
              props.makers.values.map(function(maker, idx){
                return (
                  <li key={ idx }>
                    <a  href='#' onClick={ getModels }>
                      <span className='maker-label'>{ maker.label }</span>
                      <span className='maker-count'>{ maker.count }</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
          { 
            Object.keys(models).length > 0 && <Models models={ models } />
          }
        </div>
      </React.Fragment>
    )
  
    return (
      <React.Fragment>
        <a className={ `make-and-model-button ${ showCancel ? 'hide-button' : '' }` } href='#' onClick={ getMakers }>
          Make & Model Search
          <i className="fas fa-chevron-down"></i>
        </a>
        <span className={ `cancel-search-button ${ !showCancel ? 'hide-button' : '' }` } >
          { !back && (<a className='back-button' href='#' onClick={ goBack }>
            <i className="fas fa-arrow-left"></i>
          </a>) }
          <span className='header-label'>
            { activeMaker }
          </span>
          <a className='cancel-button' href='#' onClick={ cancelSearch }>
            <i className="fas fa-times"></i>
          </a>
        </span>
        
        { !cancel && Object.keys(makers).length > 0 && <Makers makers={ makers } /> }
      </React.Fragment>
    );
  }
  
  const Models = (props) => (
    <ul className='models-list'>
      { 
        props.models.values.map(function(model, idx){
          return (
            <li key={ idx }>
              <a  href='#'>
                <span className='model-label'>{ model.label }</span>
                <span className='model-count'>{ model.count }</span>
              </a>
            </li>
          )
        })
      }
    </ul>
  )
  
  ReactDOM.render(
    <MakeAndModel/>,
    document.getElementById('make-and-model')
  );