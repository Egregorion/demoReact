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
    <div id={props.details.id}>
        <h2>{props.details.name}</h2>
        <p>{props.details.price}</p>
        <button className="btn btn-primary" onClick={props.handleAdd}>Ajouter au panier</button>
    </div>

const Order = (props) =>
    <div id={props.details.id}>
        <h2>{props.details.name}</h2>
        <p>{props.details.price}</p>
        <button className="btn btn-primary" onClick={props.decrement}>-</button>
        <span>{props.details.quantity}</span>
        <button className="btn btn-primary" onClick={props.increment}>+</button>
    </div>

//composant dans une classe
class App extends React.Component {
    state = {
        products: [
            {id: 1, name: "Cheeseburger", price: 5.95, quantity: 0},
            {id: 2, name: "CBO", price: 8.95, quantity: 0},
            {id: 3, name: "Filet O Fish", price:3.95, quantity: 0}
        ],
        ordered: [],
    }

    handleAdd = (e) => {
        const clickedElementId = e.target.parentNode.id //renvoie la div entière 
        const clicked = this.state.products.find(element => element.id == clickedElementId)
        //this.state.ordered.push(clicked) Possible mais ne provoque pas de rerender
        //Pour cela il faut utiliser setState
        //D'abord on crée une copie du tableau à modifier soit avec slice()
        // copiedOrdered = this.state.ordered.slice()
        //soit avec le spread operator ...
        const copiedOrdered = [...this.state.ordered]
        //on cherche si l'élément ne se trouve pas déjà dans le tableau
        const isOrdered = copiedOrdered.find(element => element.id == clickedElementId)
        //Si l'élément se trouve déjà dans ordered
        if(isOrdered){
            //Alors on incrémente la quantité
            isOrdered.quantity += 1
            //Puis on met à jour le state du composant en remplaçant le contenu précédent du tableau par le contenu de la copie (qui est à jour) afin de provoquer un rerender
            this.setState({ordered: copiedOrdered})
        }else{
            //Sinon, on lui ajoute notre élément
            copiedOrdered.push(clicked)
            //on incrémente sa quantité
            clicked.quantity += 1
            //On incrémente le total 
            //const amount = clicked.quantity * clicked.price
            //Puis on met à jour le state du composant en remplaçant le contenu précédent du tableau par le contenu de la copie (qui est à jour) afin de provoquer un rerender
            this.setState({ordered: copiedOrdered})
        } 
    }

    increment = (e) => {
        const clickedElementId = e.target.parentNode.id //renvoie la div entière 
        const copiedOrdered = [...this.state.ordered]
        const clicked = copiedOrdered.find(element => element.id == clickedElementId)
        clicked.quantity += 1
        this.setState({ordered: copiedOrdered})
    } 

    decrement = (e) => {
        const clickedElementId = e.target.parentNode.id //renvoie la div entière 
        const copiedOrdered = [...this.state.ordered]
        const clicked = copiedOrdered.find(element => element.id == clickedElementId)
        if(clicked.quantity > 1){
            clicked.quantity -= 1
            this.setState({ordered: copiedOrdered})
        }else {
            const clickedIndex = copiedOrdered.indexOf(clicked)
            copiedOrdered.splice(clickedIndex, 1)
            this.setState({ordered: copiedOrdered})
        }  
    }

    render() {
        const productsList = this.state.products.map(product =>
            <Product key={product.id} details={product} handleAdd={this.handleAdd} />
        )
        const orderedList = this.state.ordered.map(order =>
            <Order key={order.id} details={order} increment={this.increment} decrement={this.decrement}/> 
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