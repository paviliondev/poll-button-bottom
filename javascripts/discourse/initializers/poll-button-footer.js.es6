import { withPluginApi } from "discourse/lib/plugin-api";
import showModal from "discourse/lib/show-modal";
import { on } from 'discourse-common/utils/decorators';
import { getOwner } from 'discourse-common/lib/get-owner';

function initializePollButtonFooter(api) {
  api.modifyClass("component:d-editor", {
    @on('didInsertElement')
    makeToolbarAccessible() {
      if (this.outletArgs && this.outletArgs.editorType === 'composer') {
        const controller = getOwner(this).lookup('controller:composer');
        controller.set('editorToolbar', this.toolbar);
      }
    }
  });
}

export default {
  name: "add-poll-button-footer",

  initialize() {
    withPluginApi("0.8.7", initializePollButtonFooter);
  }
};