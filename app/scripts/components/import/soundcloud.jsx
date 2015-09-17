import React from "react";
import Reflux from "reflux";
import Radium from "radium";
import Rx from "rx";
import { IntlMixin } from "react-intl";
import classNames from "classnames";
import { searchActions } from "../../actions";
import { Settings, Search } from "../../stores";
import SoundCloudListItem from "./soundcloudListItem";

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
      .flatMapLatest(searchActions.getSoundCloudSearch)
      .subscribe(() => this.toggleSpinner(false));
  },
  observeAutocomplete() {
    let input = this.refs.soundcloudInput;
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
        <h5>{this.getIntlMessage("import.soundcloud.header")}</h5>
        <div className="input-add-on">
          <input
            className="input-add-on-field"
            placeholder={this.getIntlMessage("import.soundcloud.search_placeholder")}
            ref="soundcloudInput"
            type="text"
          />
          <div className={classNames("input-add-on-item", "spinner", {"active": this.state.loading})}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
        <div className={classNames({"soundcloud-items": this.state.items.soundcloud.length})}>
          {this.state.items.soundcloud.map(y =>
            <SoundCloudListItem
              key={y.videoId}
              {...y}
              {...Settings.opts.intlData}
            />, this)}
        </div>
      </div>
    );
  }
}));
