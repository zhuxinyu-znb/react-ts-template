import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './animate.css';
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var lastLocation = { isPush: true };
var REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
if(typeof window !== 'undefined'){
    var histories = (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);
    var isHistoryPush = function isHistoryPush(location, update) {
        var key = location.key || location.pathname + location.search;
        if (update && key !== lastLocation.key) {
            var index = histories.lastIndexOf(key);

            if (index > -1) {
                histories.splice(index + 1);
            } else {
                histories.push(key);
            }

            sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));

            lastLocation = {
                isPush: index < 0,
                key: key
            };
        }

        return lastLocation.isPush;
    };
    /**
     * @desc 路由动画组件
     * @author qiqiboy
     *
     *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
     *  import AnimatedRouter from 'react-animated-router';
     *  import 'react-animated-router/animate.css';
     */
    var AnimatedRouter = withRouter(_class = (_temp2 = _class2 = function (_Component) {
        _inherits(AnimatedRouter, _Component);

        function AnimatedRouter() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, AnimatedRouter);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnimatedRouter.__proto__ || Object.getPrototypeOf(AnimatedRouter)).call.apply(_ref, [this].concat(args))), _this), _this.inTransition = false, _this.onEnter = function (node) {
                _this.inTransition || _this.setInTransition(_this.inTransition = true);
                _this.lastTransitionNode = node;
            }, _this.onEntered = function (node) {
                if (_this.lastTransitionNode === node) {
                    _this.inTransition && _this.setInTransition(_this.inTransition = false);
                }

                if (node) {
                    //remove all transition classNames
                    node.className = node.className.split(/\s+/).filter(function (name) {
                        return !/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(name);
                    }).join(' ');
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(AnimatedRouter, [{
            key: 'setInTransition',
            value: function setInTransition(isAdd) {
                if (this.rootNode) {
                    var inName = this.props.prefix + '-in-transition';
                    this.rootNode.className = this.rootNode.className.split(/\s+/).filter(function (name) {
                        return name !== inName;
                    }).concat(isAdd ? inName : []).join(' ');
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.rootNode = findDOMNode(this);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    className = _props.className,
                    location = _props.location,
                    children = _props.children,
                    timeout = _props.timeout,
                    prefix = _props.prefix,
                    appear = _props.appear,
                    enter = _props.enter,
                    exit = _props.exit,
                    component = _props.component;

                var groupProps = {
                    appear: appear,
                    enter: enter,
                    exit: exit,
                    component: component
                };
                var cssProps = {
                    onExit: this.onEnter,
                    onExited: this.onEntered,
                    onEnter: this.onEnter,
                    onEntered: this.onEntered
                };
                var cls = [prefix + '-container', 'react-animated-router', className];

                return React.createElement(
                    TransitionGroup,
                    Object.assign({
                        className: cls.filter(Boolean).join(' '),
                        childFactory: function childFactory(child) {
                            var classNames = prefix + '-' + (isHistoryPush(location, child.props.in) ? 'forward' : 'backward');

                            return React.cloneElement(child, {
                                classNames: classNames
                            });
                        }
                    }, groupProps),
                    React.createElement(
                        CSSTransition,
                        Object.assign({
                            key: this.props.transitionKey || location.pathname,
                            addEndListener: function addEndListener(node, done) {
                                node.addEventListener('transitionend', function (e) {
                                    //确保动画来自于目标节点
                                    if (e.target === node) {
                                        done();
                                    }
                                }, false);
                            },
                            unmountOnExit: true,
                            timeout: timeout
                        }, cssProps),
                        React.createElement(
                            Switch,
                            { location: location },
                            children
                        )
                    )
                );
            }
        }]);

        return AnimatedRouter;
    }(Component), _class2.propTypes = {
        className: PropTypes.string,
        transitionKey: PropTypes.any,
        timeout: PropTypes.number,
        prefix: PropTypes.string,
        appear: PropTypes.bool,
        enter: PropTypes.bool,
        exit: PropTypes.bool,
        component: PropTypes.any
    }, _class2.defaultProps = {
        prefix: 'animated-router'
    }, _temp2)) || _class;

}else{
    var AnimatedRouter = function (_React$Component) {
        _inherits(AnimatedRouter, _React$Component);

        function AnimatedRouter() {
            _classCallCheck(this, AnimatedRouter);

            return _possibleConstructorReturn(this, (AnimatedRouter.__proto__ || Object.getPrototypeOf(AnimatedRouter)).apply(this, arguments));
        }

        _createClass(AnimatedRouter, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    location = _props.location,
                    children = _props.children;
                return React.createElement(
                    Switch,
                    {location : location},
                    children
                );
            }
        }]);

        return AnimatedRouter;
    }(Component);
}

export default AnimatedRouter;
