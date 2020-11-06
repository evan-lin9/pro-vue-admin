<template>
  <div class="el-time-spinner" :class="{ 'has-seconds': showSeconds }">
    <template v-if="!arrowControl">
      <el-scrollbar
        ref="hours"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        @mouseenter.native="emitSelectRange('hours')"
        @mousemove.native="adjustCurrentSpinner('hours')">
        <li
          v-for="(disabled, hour) in hoursList"
          :key="hour"
          class="el-time-spinner__item"
          :class="{ 'active': hour === hours, 'disabled': disabled }"
          @click="handleClick('hours', { value: hour, disabled: disabled })">{{ ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) }}{{ amPm(hour) }}</li>
      </el-scrollbar>
      <el-scrollbar
        ref="minutes"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        @mouseenter.native="emitSelectRange('minutes')"
        @mousemove.native="adjustCurrentSpinner('minutes')">
        <li
          v-for="(enabled, key) in minutesList"
          :key="key"
          class="el-time-spinner__item"
          :class="{ 'active': key === minutes, disabled: !enabled }"
          @click="handleClick('minutes', { value: key, disabled: false })">{{ ('0' + key).slice(-2) }}</li>
      </el-scrollbar>
      <el-scrollbar
        v-show="showSeconds"
        ref="seconds"
        class="el-time-spinner__wrapper"
        wrap-style="max-height: inherit;"
        view-class="el-time-spinner__list"
        noresize
        tag="ul"
        @mouseenter.native="emitSelectRange('seconds')"
        @mousemove.native="adjustCurrentSpinner('seconds')">
        <li
          v-for="(second, key) in 60"
          :key="key"
          class="el-time-spinner__item"
          :class="{ 'active': key === seconds }"
          @click="handleClick('seconds', { value: key, disabled: false })">{{ ('0' + key).slice(-2) }}</li>
      </el-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        class="el-time-spinner__wrapper is-arrow"
        @mouseenter="emitSelectRange('hours')">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul ref="hours" class="el-time-spinner__list">
          <li
            v-for="(hour, key) in arrowHourList"
            :key="key"
            class="el-time-spinner__item"
            :class="{ 'active': hour === hours, 'disabled': hoursList[hour] }">{{ hour === undefined ? '' : ('0' + (amPmMode ? (hour % 12 || 12) : hour )).slice(-2) + amPm(hour) }}</li>
        </ul>
      </div>
      <div
        class="el-time-spinner__wrapper is-arrow"
        @mouseenter="emitSelectRange('minutes')">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul ref="minutes" class="el-time-spinner__list">
          <li
            v-for="(minute, key) in arrowMinuteList"
            :key="key"
            class="el-time-spinner__item"
            :class="{ 'active': minute === minutes }">
            {{ minute === undefined ? '' : ('0' + minute).slice(-2) }}
          </li>
        </ul>
      </div>
      <div
        v-if="showSeconds"
        class="el-time-spinner__wrapper is-arrow"
        @mouseenter="emitSelectRange('seconds')">
        <i v-repeat-click="decrease" class="el-time-spinner__arrow el-icon-arrow-up"></i>
        <i v-repeat-click="increase" class="el-time-spinner__arrow el-icon-arrow-down"></i>
        <ul ref="seconds" class="el-time-spinner__list">
          <li
            v-for="(second, key) in arrowSecondList"
            :key="key"
            class="el-time-spinner__item"
            :class="{ 'active': second === seconds }">
            {{ second === undefined ? '' : ('0' + second).slice(-2) }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script type="text/babel">
/* eslint-disable */
  import { getRangeHours, getRangeMinutes, modifyTime } from 'element-ui/src/utils/date-util';
  // import ElScrollbar from 'element-ui/packages/scrollbar';
  import RepeatClick from 'element-ui/src/directives/repeat-click';

  export default {
    // components: { ElScrollbar },

    directives: {
      repeatClick: RepeatClick
    },

    props: {
      date: {},
      defaultValue: {}, // reserved for future use
      showSeconds: {
        type: Boolean,
        default: true
      },
      arrowControl: Boolean,
      amPmMode: {
        type: String,
        default: '' // 'a': am/pm; 'A': AM/PM
      }
    },

    computed: {
      hours() {
        return this.date.getHours();
      },
      minutes() {
        return this.date.getMinutes();
      },
      seconds() {
        return this.date.getSeconds();
      },
      hoursList() {
        return getRangeHours(this.selectableRange);
      },
      minutesList() {
        return getRangeMinutes(this.selectableRange, this.hours);
      },
      arrowHourList() {
        const hours = this.hours;
        return [
          hours > 0 ? hours - 1 : undefined,
          hours,
          hours < 23 ? hours + 1 : undefined
        ];
      },
      arrowMinuteList() {
        const minutes = this.minutes;
        return [
          minutes > 0 ? minutes - 1 : undefined,
          minutes,
          minutes < 59 ? minutes + 1 : undefined
        ];
      },
      arrowSecondList() {
        const seconds = this.seconds;
        return [
          seconds > 0 ? seconds - 1 : undefined,
          seconds,
          seconds < 59 ? seconds + 1 : undefined
        ];
      }
    },

    data() {
      return {
        selectableRange: [],
        currentScrollbar: null
      };
    },

    mounted() {
      this.$nextTick(() => {
        !this.arrowControl && this.bindScrollEvent();
      });
    },

    methods: {
      increase() {
        this.scrollDown(1);
      },

      decrease() {
        this.scrollDown(-1);
      },

      modifyDateField(type, value) {
        switch (type) {
          case 'hours': this.$emit('change', modifyTime(this.date, value, this.minutes, this.seconds)); break;
          case 'minutes': this.$emit('change', modifyTime(this.date, this.hours, value, this.seconds)); break;
          case 'seconds': this.$emit('change', modifyTime(this.date, this.hours, this.minutes, value)); break;
        }
      },

      handleClick(type, {value, disabled}) {
        if (!disabled) {
          this.modifyDateField(type, value);
          this.emitSelectRange(type);
          this.adjustSpinner(type, value);
        }
      },

      emitSelectRange(type) {
        if (type === 'hours') {
          this.$emit('select-range', 0, 2);
        } else if (type === 'minutes') {
          this.$emit('select-range', 3, 5);
        } else if (type === 'seconds') {
          this.$emit('select-range', 6, 8);
        }
        this.currentScrollbar = type;
      },

      bindScrollEvent() {
        const bindFuntion = (type) => {
          this.$refs[type].wrap.onscroll = (e) => {
            // TODO: scroll is emitted when set scrollTop programatically
            // should find better solutions in the future!
            this.handleScroll(type, e);
          };
        };
        bindFuntion('hours');
        bindFuntion('minutes');
        bindFuntion('seconds');
      },

      handleScroll(type) {
        const value = Math.min(Math.round((this.$refs[type].wrap.scrollTop - (this.scrollBarHeight(type) * 0.5 - 10) / this.typeItemHeight(type) + 3) / this.typeItemHeight(type)), (type === 'hours' ? 23 : 59));
        this.modifyDateField(type, value);
      },

      // NOTE: used by datetime / date-range panel
      //       renamed from adjustScrollTop
      //       should try to refactory it
      adjustSpinners() {
        this.adjustSpinner('hours', this.hours);
        this.adjustSpinner('minutes', this.minutes);
        this.adjustSpinner('seconds', this.seconds);
      },

      adjustCurrentSpinner(type) {
        this.adjustSpinner(type, this[type]);
      },

      adjustSpinner(type, value) {
        if (this.arrowControl) return;
        const el = this.$refs[type].wrap;
        if (el) {
          el.scrollTop = Math.max(0, value * this.typeItemHeight(type));
        }
      },

      scrollDown(step) {
        if (!this.currentScrollbar) {
          this.emitSelectRange('hours');
        }

        const label = this.currentScrollbar;
        const hoursList = this.hoursList;
        let now = this[label];

        if (this.currentScrollbar === 'hours') {
          let total = Math.abs(step);
          step = step > 0 ? 1 : -1;
          let length = hoursList.length;
          while (length-- && total) {
            now = (now + step + hoursList.length) % hoursList.length;
            if (hoursList[now]) {
              continue;
            }
            total--;
          }
          if (hoursList[now]) return;
        } else {
          now = (now + step + 60) % 60;
        }

        this.modifyDateField(label, now);
        this.adjustSpinner(label, now);
        this.$nextTick(() => this.emitSelectRange(this.currentScrollbar));
      },
      amPm(hour) {
        let shouldShowAmPm = this.amPmMode.toLowerCase() === 'a';
        if (!shouldShowAmPm) return '';
        let isCapital = this.amPmMode === 'A';
        let content = (hour < 12) ? ' am' : ' pm';
        if (isCapital) content = content.toUpperCase();
        return content;
      },
      typeItemHeight(type) {
        return this.$refs[type].$el.querySelector('li').offsetHeight;
      },
      scrollBarHeight(type) {
        return this.$refs[type].$el.offsetHeight;
      }
    }
  };
</script>
