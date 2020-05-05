import { getOwner } from 'discourse-common/lib/get-owner';

export default {
  setupComponent(attrs, ctx) {
    const controller = getOwner(this).lookup('controller:composer');
    
    controller.addObserver('editorToolbar', function() {
      if (this._state === 'destroying') return;
      
      const toolbar = controller.editorToolbar;
            
      toolbar.addButton({
        group: "extras",
        icon: "chart-bar",
        title: "poll.ui_builder.title",
        sendAction: e => {
          controller.send('storeToolbarState', e);
          this.send("showPollBuilder");
        }
      });
      
      const extras = toolbar.groups.find(g => g.group == 'extras');
      const pollButton = extras.buttons.find(b => b.icon == "chart-bar");
          
      ctx.set('pb', pollButton);
    });
  }
}