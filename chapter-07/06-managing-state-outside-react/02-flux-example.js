
    //
    // Simple Flux Sample, with Facebook's Flux Dispatcher
    //

    const { Component } = React
    const { Dispatcher } = Flux

    /* View : React Countdown Component
    ************************************************************/

    const Countdown = ({count, tick, reset}) => {

    if (count) {
      setTimeout(() => tick(count), 1000)
    }

    return (count) ?
        <h1>{count}</h1> :
        <div onClick={() => reset(10)}>
            <span>CELEBRATE!!!</span>
            <span>(click to start over)</span>
        </div>

    }

    /* Action Creators : Create Action Objects
    ************************************************************/

    const countdownActions = dispatcher =>
    ({
      tick(count) {
        dispatcher.handleAction({
          type: 'TICK',
          count: count - 1
        })
      },
      reset(count) {
        dispatcher.handleAction({
          type: 'RESET',
          count
        })
      }
    })

    /* CountDispatcher : Dispatches actions for the Countodown
    ************************************************************/

    class CountdownDispatcher extends Dispatcher {

    handleAction(action) {
      console.log('dispatching action:', action)
      this.dispatch({
        source: 'VIEW_ACTION',
        action
      })
    }

    }

    /* The Store : Holds the Countdown Info
    ************************************************************/

    class CountdownStore extends EventEmitter {

    constructor(count=5, dispatcher) {
      super()
      this._count = count
      this.dispatcherIndex = dispatcher.register(this.dispatch.bind(this))
    }

    get count() {
      return this._count
    }

    dispatch(payload) {
      const { type, count } = payload.action
      switch(type) {

        case "TICK":
          this._count = count
          this.emit("TICK")
          return true

        case "RESET":
          this._count = count
          this.emit("RESET")
          return true

      }
    }

    }

    /* Flux App : Put it all together
    ************************************************************/
    const appDispatcher = new CountdownDispatcher()
    const actions = countdownActions(appDispatcher)
    const store = new CountdownStore(10, appDispatcher)

    const render = count => ReactDOM.render(
      <Countdown count={count} {...actions} />,
      document.getElementById('react-container')
    )

    store.on("TICK", ()=> render(store.count))
    store.on("RESET", ()=> render(store.count))
    render(store.count)