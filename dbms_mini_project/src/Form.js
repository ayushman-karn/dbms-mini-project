import react from "react";
import "./form.css";
class Form extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ' ',
            usn: ' ',
            sem: ' ',
        }
    }
    handleSubmit(event) {

    }

    handleUserNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleUsnChange = (event) => {
        this.setState({
            usn: event.target.value
        })
    }
    handleSem = (event) => {
        this.setState({
            sem: event.target.value
        })
    }

    render() {
        return (
            <div className="form-class">
                <form onSubmit={this.handleSubmit}>
                    <div id="name">
                        <label for="name" className="name-space">Name <br></br></label>
                        <input name="name" id="name" value={this.state.name} type="text" onChange={this.handleUserNameChange} />
                    </div>

                    <div id="usn">
                        <label for="usn" className="space">USN    </label>
                        <input name="usn" id="usn" value={this.state.usn} type="text" onChange={this.handleUsnChange} />
                    </div>
                    <div id="sem">
                        <label className="space">Semester</label>
                        <select value={this.state.sem} onChange={this.handleSem}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <button type="submit" styles={"margin-left: 44px"}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
export default Form