//en js classique
const titre = document.createElement('h1')
titre.className = "text-center"
titre.innerText = "Hello World!"


//pour créer un composant React sans JSX
const titre2 = React.createElement('h1', {id: "titreReact", className: "text-center"}, "Hello World of React !")

//avec JSX
const titre3 = <h1 className="text-center">Hello World of JSX !</h1>

//composant avec une fonction, à noter : on l'appelle avec la syntaxe <Component />
const Titre4 = (props) => <h1 className="text-center">{props.content}</h1>



const Product = (props) => 
    <div id={props.details.id} onClick={props.handleClick}>
        <h2>{props.details.name}</h2>
        <p>{props.details.price}</p>
    </div>


//composant dans une classe
class App extends React.Component {
    state = {
        products: [
            {id: 1, name: "Cheeseburger", price: 5.95},
            {id: 2, name: "CBO", price: 8.95},
            {id: 3, name: "Filet O Fish", price:3.95}
        ],
        ordered : []
    }

    handleClick = (e) => {
        const clickedElementId = e.target.parentNode.id //renvoie la div entière 
        const clicked = this.state.products.find(element => element.id == clickedElementId)
        //this.state.ordered.push(clicked) Possible mais ne provoque pas de rerender
        //Pour cela il faut utiliser setState
        //D'abord on crée une copie du tableau à modifier soit avec slice()
        // copiedOrdered = this.state.ordered.slice()
        //soit avec le spread operator ...
        const copiedOrdered = [...this.state.ordered]
        //on lui ajoute notre élément
        copiedOrdered.push(clicked)
        this.setState({ordered: copiedOrdered})
    }

    render() {
        const productsList = this.state.products.map(product =>
            <Product key={product.id} details={product} handleClick={this.handleClick} />
        )
        const orderedList = this.state.ordered.map(order =>
            <Product key={order.id} details={order} /> 
        )
        return(
            <React.Fragment>
                {productsList}
                {orderedList}
            </React.Fragment>
        ) 
            
    }
}

//on rend l'élément dans le DOM en js classique
const root = document.querySelector('#app')
//app.appendChild(titre2)

//on rend l'élément dans le DOM via la méthode render() de ReactDOM
ReactDOM.render(
    <App />,
    root
)