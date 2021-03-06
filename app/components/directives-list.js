import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Component.extend({
  openDirective(path, title) {
    this.modal.find(' h4.modal-title').text(title);
    this.modal.find('#directiveFrame a').attr('href', path); // Needed in case the browser doesn't support iframes
    this.modal.find('#directiveFrame').attr('src', path);
    this.modal.modal();
    this.modal.find('input[type="text"]').val(window.location + '#' + path.substring(40));
    if (window.ga && typeof window.ga === "function") {
      ga('send', 'event', 'Directive', 'open', title);
    }
  },
  dateSorter(a, b) {
    a = new Date(a);
    b = new Date(b);
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  },
  didRender() {
    this.modal = $('#directiveViewer');
    this.table = $('#directives');

    fetch('https://directives.crimeisdown.com/diff_list.json').then((response) => {
      response.json().then((directives) => {
        this.table.bootstrapTable({
          columns: [{
            field: 'link',
            title: 'Directive Title',
            sortable: true
          }, {
            field: 'issue_date',
            title: 'Issue Date',
            sortable: true,
            sorter: this.dateSorter
          }, {
            field: 'effective_date',
            title: 'Effective Date',
            sortable: true,
            sorter: this.dateSorter
          }, {
            field: 'rescinds',
            title: 'Rescinds',
            sortable: true
          }, {
            field: 'index_category',
            title: 'Index Category',
            sortable: true
          }],
          data: directives,
          sortName: 'issue_date',
          sortOrder: 'desc'
        });

        this.table.find('td > a').click((event) => {
          event.preventDefault();
          this.openDirective($(event.currentTarget).attr('href'), $(event.currentTarget).text());
        });

        if (window.location.hash) {
          let path = window.location.hash.substring(1);
          let title = this.table.find('td > a[href="https://directives.crimeisdown.com/diff/' + path + '"]').text();
          this.openDirective('https://directives.crimeisdown.com/diff/' + path, title);
          window.location.hash = '';
        }
      });
    });

    this.modal.find('form input').focus((event) => {
      $(event.currentTarget).select();
      try {
        document.execCommand('copy');
      } catch (e) {
        alert('Your browser does not support automatic copying, please copy the text manually.');
      }
    });
  }
});
