import React from "react";
import Reflux from "reflux";
import Radium from "radium";
import Rx from "rx";
import { IntlMixin } from "react-intl";
import classNames from "classnames";
import { searchActions } from "../../actions";
import { Settings, Search } from "../../stores";
import YoutubeListItem from "./youtubeListItem";

export default new Radium(React.createClass({
  mixins: [ IntlMixin, Reflux.connect(Search, "items") ],
  getInitialState() {
    return { loading: false };
  },
  componentDidMount() {
    let autocomplete = this.observeAutocomplete();
    autocomplete
      .subscribe(() => this.toggleSpinner(true));

    autocomplete
      .flatMapLatest(searchActions.getYoutubeSearch)
      .subscribe(() => this.toggleSpinner(false));
  },
  observeAutocomplete() {
    let input = this.refs.youtubeInput;
    return Rx.Observable.fromEvent(input, "keyup")
      .map(e => e.target.value)
      .filter(text => text.length > 2)
      .throttle(250)
      .distinctUntilChanged();
  },
  toggleSpinner(active) {
    if (this.state.loading !== active) {
      this.setState({ loading: active });
    }
  },
  render() {
    return (
      <div>
        <h5>{this.getIntlMessage("import.youtube.header")}</h5>
        <div className="input-add-on">
          <input
            className="input-add-on-field"
            placeholder={this.getIntlMessage("import.youtube.search_placeholder")}
            ref="youtubeInput"
            type="text"
          />
          <div className={classNames("input-add-on-item", "spinner", {"active": this.state.loading})}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
        <div className={classNames({"youtube-items": this.state.items.youtube.length})}>
          {this.state.items.youtube.map(y =>
            <YoutubeListItem
              key={y.videoId}
              {...y}
              {...Settings.opts.intlData}
            />, this)}
          </div>
      </div>
    );
  }
}));
