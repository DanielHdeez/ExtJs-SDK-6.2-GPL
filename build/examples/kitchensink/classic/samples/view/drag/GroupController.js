/**
 * This example shows drag groups.
 */
Ext.define('KitchenSink.view.drag.GroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drag-group',

    requires: [
        'Ext.window.Toast'
    ],

    afterRender: function (view) {
        this.group1Source = this.createSource({
            id: 'group1-source',
            element: view.el.down('.group-source-group1'),
            // This source will only interact with targets that belong to group1
            groups: 'group1'
        });

        this.group2Source = this.createSource({
            id: 'group2-source',
            element: view.el.down('.group-source-group2'),
            // This source will only interact with targets that belong to group2
            groups: 'group2'
        });

        this.bothSource = this.createSource({
            id: 'both-source',
            element: view.el.down('.group-source-both'),
            // This source will only interact with targets that belong to group1 or group2
            groups: ['group1', 'group2']
        });

        this.group1Target = this.createTarget({
            id: 'group1-target',
            element: view.el.down('.group-target-group1'),
            // This target will only interact with sources that belong to group1
            groups: 'group1'
        });

        this.group2Target = this.createTarget({
            id: 'group2-target',
            element: view.el.down('.group-target-group2'),
            // This target will only interact with sources that belong to group2
            groups: 'group2'
        });

        this.bothTarget = this.createTarget({
            id: 'both-target',
            element: view.el.down('.group-target-both'),
            // This source will only interact with sources that belong to group1 or group2
            groups: ['group1', 'group2']
        });
    },

    createSource: function (cfg) {
        var view = this.getView();

        return new Ext.drag.Source(Ext.apply(cfg, {
            constrain: view.body,
            proxy: {
                type: 'placeholder',
                cls: 'group-proxy',
                invalidCls: 'group-proxy-invalid',
                validCls: 'group-proxy-valid',
                html: 'Drag'
            }
        }));
    },

    createTarget: function (cfg) {
        return new Ext.drag.Target(Ext.apply(cfg, {
            listeners: {
                drop: function (target, info) {
                    var s = Ext.String.format('Dropped "{0} on "{1}"', 
                                    info.source.getId(), target.getId());

                    Ext.toast({
                        html: s,
                        closable: false,
                        align: 't',
                        slideInDuration: 400,
                        minWidth: 400
                    });
                }
            }
        }));
    },

    destroy: function() {
        this.group1Source = Ext.destroy(this.group1Source);
        this.group2Source = Ext.destroy(this.group2Source);
        this.bothSource = Ext.destroy(this.bothSource);
        this.group1Target = Ext.destroy(this.group1Target);
        this.group2Target = Ext.destroy(this.group2Target);
        this.bothTarget = Ext.destroy(this.bothTarget);

        this.callParent();
    }
});
