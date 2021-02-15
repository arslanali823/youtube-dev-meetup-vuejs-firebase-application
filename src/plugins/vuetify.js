import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.red.darken2,
        accent: colors.grey.darken3,
        secondary: colors.red.darken3,
        info: colors.blue.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.green.accent2
      },
    },
  },
});
