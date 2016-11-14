'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
} from 'react-native';

export default class CollectionView extends Component{
    groupItems(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
          if (group.length === itemsPerRow) {
            itemsGroups.push(group);
            group = [item];
          } else {
            group.push(item);
          }
        });

        if (group.length > 0) {
          itemsGroups.push(group);
        }

        return itemsGroups;
    }
        constructor(props) {
          super(props);
          this.state = {items: [], renderItem: null, style: undefined, itemsPerRow: 1, onEndReached: undefined};
    }

    renderGroup(group) {
      var that = this;
      var items = group.map(function(item, index) {
        return that.props.renderItem(item, index);
      });
      return (
        <View style={styles.group}>
          {items}
        </View>
      );
    }

    render() {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<ListView
          dataSource={ds.cloneWithRows(groups)}
          renderRow={this.renderGroup}
          style={this.props.style}
          onEndReached={this.props.onEndReached}
          scrollEnabled={this.props.scrollEnabled}
          renderHeader={this.props.renderHeader}
          renderFooter={this.props.renderFooter}
          pageSize={this.props.pageSize | 1}
        />);
    }
};


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = CollectionView;
