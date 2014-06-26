'use strict';

angular.module('mpk').factory('kanbanManipulator', function () {
  return {
    addColumn: function(kanban, columnName){
      kanban.columns.push(new KanbanColumn(columnName));
    },

    addCardToColumn: function(kanban, column, cardTitle, details, color){
      angular.forEach(kanban.columns, function(col){
        if (col.name === column.name){
          col.cards.push(new KanbanCard(cardTitle, details, color));
        }
      });
    },

    removeCardFromColumn: function(kanban, column, card){
      angular.forEach(kanban.columns, function(col){
        if (col.name === column.name){
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },

    archiveCard: function(kanban, column, card){
      if (kanban.archived == undefined){
        kanban.archived = [];
      }
      kanban.archived.push({card: card, archivedOn: new Date()})
      this.removeCardFromColumn(kanban, column, card);
    },

    unarchiveCard: function(kanban, archivedCard){
      function lastColumn(kanban){
        return kanban.columns[kanban.columns.length - 1];
      }
      kanban.archived.splice(kanban.archived.indexOf(archivedCard), 1); 
      lastColumn(kanban).cards.push(archivedCard.card);     
    },

    removeFromArchive: function(kanban, card){

    }
  };
});