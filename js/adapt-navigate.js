define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");
    var Backbone = require('backbone');
    
    var Navigate = ComponentView.extend({
        events: {
            'click .navigate-icon':'navigateTo',
        },
        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
            this.$('.component-widget').on('inview', _.bind(this.inview, this));
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-widget').off('inview');
                    this.setCompletionStatus();
                }
                
            }
        },
        
        resizeImage: function(width) {
            var src = this.$('.navigate-widget img').attr('data-' + width);
            this.$('.navigate-widget img').attr('src', src);

            this.$('.navigate-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        },
        
        navigateTo: function(event) {
            event.preventDefault();
            var contentobject = $(event.currentTarget).data('to');
            Backbone.history.navigate('#/id/' + contentobject, true);
        }
    });

    Adapt.register("navigate", Navigate);
});