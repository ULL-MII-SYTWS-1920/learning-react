const createItem = () =>
    (Math.random() > .5) ? "smile" : "frown"

const createList =
    (count=10) => Array.apply(null, Array(count)).map(x => createItem())

const countMutations = (newList, oldList) =>
    newList.reduce((counter, item, i) => (oldList[i] === item) ? counter : counter+1, 0)

let data

class Mood extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { children } = this.props
        console.log("this.props.children = ",children)
        console.log("nextProps.children = ",nextProps.children)
        return children !== nextProps.children
    }
    componentWillUpdate(nextProps) {
        const { children } = this.props
        const { moodItem } = this.refs
        console.log('moodItem = ',moodItem)
        moodItem.style.backgroundColor = '#6099A0'
        console.log(`React changing a "${children}" to a "${nextProps.children}"`)
    }
    componentDidUpdate() {
        // So that the blue color for the changed stays for a while
        setTimeout(() => this.refs.moodItem.style.backgroundColor = '', 700)
    }
    render() {
        const { children } = this.props
        return <li ref="moodItem" className={children}>{children}</li>
    }
}

const ReactList = ({ data }) =>
    <ul className="react-list">
        {data.map((mood, i) => <Mood key={i}>{mood}</Mood>)}
    </ul>

function updateJQuery(data) {
    //var firstTime = $('ul.jquery-list li').size() === 0;
    var firstTime = $('ul.jquery-list li').length === 0;
    console.log($('ul.jquery-list li').length);
    
    if (!firstTime) {
        console.log('jQuery emptying list');
    }
    $('ul.jquery-list').empty();
    $.each(data, function() {
        console.log(`Traversing ${data} this = ${this}`)
        $('<li>').addClass(this).text(this).appendTo('ul.jquery-list');
        if (!firstTime) {
            console.log(`jQuery inserting ${this}`);
        }
    });
}

function changeTheMood() {
    var mutations, newDataSet = createList(5)
    if (data) {
        mutations = countMutations(data, newDataSet)
        $('section:first-of-type h2').text(`${mutations} mutation${(mutations > 1) ? 's' : ''}`);
    }
    updateJQuery(newDataSet)
    ReactDOM.render(<ReactList data={newDataSet} />, document.getElementById('target-react'))
    data = newDataSet
}

$('<ul>').addClass('jquery-list').appendTo('div#target-jquery')
$(document).keydown(e => (e.which === 32) ? changeTheMood() : null)
document.addEventListener('touchend', changeTheMood)
changeTheMood()
