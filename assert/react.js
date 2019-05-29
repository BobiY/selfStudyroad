/ ** @license React v16.8.6
 * react.development.js
 *
 *版权所有（c）Facebook，Inc。及其附属公司。
 *
 *此源代码根据MIT许可证获得许可
 *此源树的根​​目录中的LICENSE文件。
 * /

'使用严格';

（功能（全球，工厂）{
	typeof exports ==='object'&& typeof module！=='undefined'？module.exports = factory（）：
	typeof define ==='function'&& define.amd？define（工厂）：
	（global.React = factory（））;
}（this，（function（）{'use strict';

// TODO：这很特别，因为它在构建期间导入。

var ReactVersion = '16 .8.6';

//用于标记类似ReactElement的类型的符号。如果没有本机符号
//也不是polyfill，然后使用普通数字来表现。
var hasSymbol = typeof符号==='function'&& Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol？Symbol.for（'react.element'）：0xeac7;
var REACT_PORTAL_TYPE = hasSymbol？Symbol.for（'react.portal'）：0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol？Symbol.for（'react.fragment'）：0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol？Symbol.for（'react.strict_mode'）：0xeacc;
var REACT_PROFILER_TYPE = hasSymbol？Symbol.for（'react.profiler'）：0xead2;
var REACT_PROVIDER_TYPE = hasSymbol？Symbol.for（'react.provider'）：0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol？Symbol.for（'react.context'）：0xeace;

var REACT_CONCURRENT_MODE_TYPE = hasSymbol？Symbol.for（'react.concurrent_mode'）：0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol？Symbol.for（'react.forward_ref'）：0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol？Symbol.for（'react.suspense'）：0xead1;
var REACT_MEMO_TYPE = hasSymbol？Symbol.for（'react.memo'）：0xead3;
var REACT_LAZY_TYPE = hasSymbol？Symbol.for（'react.lazy'）：0xead4;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol ==='function'&& Symbol.iterator;
var FAUX_ITERATOR_SYMBOL ='@@ iterator';

function getIteratorFn（maybeIterable）{
  if（maybeIterable === null || typeof maybeIterable！=='object'）{
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable [MAYBE_ITERATOR_SYMBOL] || maybeIterable [FAUX_ITERATOR_SYMBOL];
  if（typeof maybeIterator ==='function'）{
    return maybeIterator;
  }
  return null;
}

/ *
对象分配
（c）Sindre Sorhus
@license麻省理工学院
* /


/ * eslint-disable no-unused-vars * /
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject（val）{
	if（val === null || val === undefined）{
		抛出新的TypeError（'Object.assign不能用null或undefined'调用）;
	}

	return Object（val）;
}

function shouldUseNative（）{
	尝试{
		if（！Object.assign）{
			返回false;
		}

		//检测旧版V8中的错误属性枚举顺序。

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String（'abc'）; // eslint-disable-line no-new-wrappers
		test1 [5] ='de';
		if（Object.getOwnPropertyNames（test1）[0] ==='5'）{
			返回false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for（var i = 0; i <10; i ++）{
			test2 ['_'+ String.fromCharCode（i）] = i;
		}
		var order2 = Object.getOwnPropertyNames（test2）.map（function（n）{
			return test2 [n];
		}）;
		if（order2.join（''）！=='0123456789'）{
			返回false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split（''）。forEach（function（letter）{
			test3 [letter] = letter;
		}）;
		if（Object.keys（Object.assign（{}，test3））。join（''）！==
				'abcdefghijklmnopqrst'）{
			返回false;
		}

		返回true;
	} catch（err）{
		//我们不希望抛出任何上述内容，但更安全。
		返回false;
	}
}

var objectAssign = shouldUseNative（）？Object.assign：function（target，source）{
	var from ;;
	var to = toObject（target）;
	var符号;

	for（var s = 1; s <arguments.length; s ++）{
		from = Object（arguments [s]）;

		for（var key in from）{
			if（hasOwnProperty.call（from，key））{
				至[key] =来自[key];
			}
		}

		if（getOwnPropertySymbols）{
			symbols = getOwnPropertySymbols（from）;
			for（var i = 0; i <symbols.length; i ++）{
				if（propIsEnumerable.call（from，symbols [i]））{
					to [symbols [i]] = from [symbols [i]];
				}
			}
		}
	}

	还给;
};

/ **
 *使用invariant（）来断言程序假定为真的状态。
 *
 *提供sprintf样式格式（仅支持％s）和参数
 *提供有关什么破坏和你是什么的信息
 *期待。
 *
 *不变的消息将在生产中被删除，但是不变量
 *将保持以确保逻辑在生产中没有差异。
 * /

var validateFormat = function（）{};

{
  validateFormat = function（format）{
    if（format === undefined）{
      throw new Error（'invariant需要一个错误消息参数'）;
    }
  };
}

函数不变量（条件，格式，a，b，c，d，e，f）{
  validateFormat（格式）;

  if（！condition）{
    var error = void 0;
    if（format === undefined）{
      error = new错误（'发生缩小的异常;使用非缩小的开发环境'+'表示完整的错误消息和其他有用的警告。'）;
    } else {
      var args = [a，b，c，d，e，f];
      var argIndex = 0;
      error = new Error（format.replace（/％s / g，function（）{
        return args [argIndex ++];
      }））;
      error.name ='不变违规';
    }

    error.framesToPop = 1; //我们不关心不变的自己的框架
    抛出错误;
  }
}

//依靠`invariant（）`实现让我们
//保留www版本中的格式和参数。

/ **
 *从fbjs /警告分叉：
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 *只有更改是我们使用console.warn而不是console.error，
 *当不支持“控制台”时不执行任何操作。
 *这真的简化了代码。
 * ---
 *与不变量类似，但仅在不满足条件时才记录警告。
 *这可用于记录关键的开发环境中的问题
 *路径。删除生产环境的日志记录代码将保留
 *相同的逻辑并遵循相同的代码路径。
 * /

var lowPriorityWarning = function（）{};

{
  var printWarning = function（format）{
    for（var _len = arguments.length，args = Array（_len> 1？_len  -  1：0），_ key = 1; _key <_len; _key ++）{
      args [_key  -  1] =参数[_key];
    }

    var argIndex = 0;
    var message ='警告：'+ format.replace（/％s / g，function（）{
      return args [argIndex ++];
    }）;
    if（typeof console！=='undefined'）{
      console.warn（消息）;
    }
    尝试{
      // ---欢迎调试React ---
      //抛出此错误是为了方便，以便您可以使用此堆栈
      //找到导致此警告触发的调用点。
      抛出新的错误（消息）;
    } catch（x）{}
  };

  lowPriorityWarning = function（condition，format）{
    if（format === undefined）{
      抛出新的错误（'`lowPriorityWarning（condition，format，... args）`需要一个警告'+'消息参数'）;
    }
    if（！condition）{
      for（var _len2 = arguments.length，args = Array（_len2> 2？_len2  -  2：0），_ key2 = 2; _key2 <_len2; _key2 ++）{
        args [_key2  -  2] =参数[_key2];
      }

      printWarning.apply（undefined，[format] .concat（args））;
    }
  };
}

var lowPriorityWarning $ 1 = lowPriorityWarning;

/ **
 *与不变量类似，但仅在不满足条件时才记录警告。
 *这可用于记录关键的开发环境中的问题
 *路径。删除生产环境的日志记录代码将保留
 *相同的逻辑并遵循相同的代码路径。
 * /

var warningWithoutStack = function（）{};

{
  warningWithoutStack = function（condition，format）{
    for（var _len = arguments.length，args = Array（_len> 2？_len  -  2：0），_ key = 2; _key <_len; _key ++）{
      args [_key  -  2] =参数[_key];
    }

    if（format === undefined）{
      抛出新错误（'`warningWithoutStack（condition，format，... args）`需要一个警告'+'消息参数'）;
    }
    if（args.length> 8）{
      //在条件之前检查以及早发现违规行为。
      throw new Error（'warningWithoutStack（）目前最多支持8个参数。'）;
    }
    if（condition）{
      返回;
    }
    if（typeof console！=='undefined'）{
      var argsWithFormat = args.map（function（item）{
        return''+ item;
      }）;
      argsWithFormat.unshift（'警告：'+格式）;

      //我们故意不直接使用spread（或.apply），因为它
      //打破IE9：https：//github.com/facebook/react/issues/13610
      Function.prototype.apply.call（console.error，console，argsWithFormat）;
    }
    尝试{
      // ---欢迎调试React ---
      //抛出此错误是为了方便，以便您可以使用此堆栈
      //找到导致此警告触发的调用点。
      var argIndex = 0;
      var message ='警告：'+ format.replace（/％s / g，function（）{
        return args [argIndex ++];
      }）;
      抛出新的错误（消息）;
    } catch（x）{}
  };
}

var warningWithoutStack $ 1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop（publicInstance，callerName）{
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor &&（_constructor.displayName || _constructor.name）|| 'ReactClass';
    var warningKey = componentName +'。' + callerName;
    if（didWarnStateUpdateForUnmountedComponent [warningKey]）{
      返回;
    }
    warningWithoutStack $ 1（false，“无法在尚未挂载的组件上调用％s。”+'这是一个无操作，但它可能表示您的应用程序中存在错误。'+'而是分配给`this .state`直接或定义一个`state = {};`'+'类属性，在％s组件中具有所需的状态。'，callerName，componentName）;
    didWarnStateUpdateForUnmountedComponent [warningKey] = true;
  }
}

/ **
 *这是更新队列的抽象API。
 * /
var ReactNoopUpdateQueue = {
  / **
   *检查是否已安装此复合组件。
   * @param {ReactClass} publicInstance我们要测试的实例。
   * @return {boolean}如果安装则为True，否则为false。
   * @protected
   * @最后
   * /
  isMounted：function（publicInstance）{
    返回false;
  }，

  / **
   *强制更新。只有在知道时才应该调用它
   *确定我们在DOM交易中不是**。
   *
   *当你知道某些更深层次的方面时，你可能想要打电话
   *组件的状态已更改，但未调用`setState`。
   *
   *这不会调用`shouldComponentUpdate`，但会调用它
   *`componentWillUpdate`和`componentDidUpdate`。
   *
   * @param {ReactClass} publicInstance应该重新渲染的实例。
   * @param {？function} callback组件更新后调用。
   * @param {？string}公共API中调用函数的callerName名称。
   * @internal
   * /
  enqueueForceUpdate：function（publicInstance，callback，callerName）{
    warnNoop（publicInstance，'forceUpdate'）;
  }，

  / **
   *取代所有的州。始终使用this或`setState`来改变状态。
   *你应该将`this.state`视为不可变的。
   *
   *无法保证`this.state`会立即更新，所以
   *调用此方法后访问`this.state`可能会返回旧值。
   *
   * @param {ReactClass} publicInstance应该重新渲染的实例。
   * @param {object} completeState下一个状态。
   * @param {？function} callback组件更新后调用。
   * @param {？string}公共API中调用函数的callerName名称。
   * @internal
   * /
  enqueueReplaceState：function（publicInstance，completeState，callback，callerName）{
    warnNoop（publicInstance，'replaceState'）;
  }，

  / **
   *设置状态的子集。这只是因为_pendingState而存在
   *内部。这提供了深度不可用的合并策略
   *属性令人困惑。TODO：暴露pendingState或不使用它
   *合并期间。
   *
   * @param {ReactClass} publicInstance应该重新渲染的实例。
   * @param {object} partialState下一个要与状态合并的部分状态。
   * @param {？function} callback组件更新后调用。
   * @param {？string}公共API中调用函数的名称。
   * @internal
   * /
  enqueueSetState：function（publicInstance，partialState，callback，callerName）{
    warnNoop（publicInstance，'setState'）;
  }
};

var emptyObject = {};
{
  Object.freeze（emptyObject）;
}

/ **
 *用于组件更新状态的基类帮助程序。
 * /
function Component（props，context，updater）{
  this.props =道具;
  this.context = context;
  //如果一个组件有字符串引用，我们稍后会分配一个不同的对象。
  this.refs = emptyObject;
  //我们初始化默认的更新程序，但真正的更新程序由注入
  //渲染器。
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/ **
 *设置状态的子集。总是使用它来变异
 *国家。你应该将`this.state`视为不可变的。
 *
 *无法保证`this.state`会立即更新，所以
 *调用此方法后访问`this.state`可能会返回旧值。
 *
 *无法保证对`setState`的调用将同步运行，
 *因为他们最终可能会被分批。您可以提供可选项
 *实际调用setState时将执行的回调
 *完成。
 *
 *当一个函数提供给setState时，它将在某个时刻被调用
 *未来（不同步）。它将与最新的一起调用
 *组件参数（状态，道具，上下文）。这些值可以不同
 *来自此。*因为您的函数可能在receiveProps之后但之前被调用
 * shouldComponentUpdate，这个新的状态，道具和上下文还没有
 *分配给此。
 *
 * @param {object | function} partialState下一个部分状态或函数
 *产生下一个部分状态与当前状态合并。
 * @param {？function} callback状态更新后调用。
 * @最后
 * @protected
 * /
Component.prototype.setState = function（partialState，callback）{
  ！（typeof partialState ==='object'|| typeof partialState ==='function'|| partialState == null）？invariant（false，'setState（...）：获取状态变量的对象进行更新或返回状态变量对象的函数。'）：void 0;
  this.updater.enqueueSetState（this，partialState，callback，'setState'）;
};

/ **
 *强制更新。只有在知道时才应该调用它
 *确定我们在DOM交易中不是**。
 *
 *当你知道某些更深层次的方面时，你可能想要打电话
 *组件的状态已更改，但未调用`setState`。
 *
 *这不会调用`shouldComponentUpdate`，但会调用它
 *`componentWillUpdate`和`componentDidUpdate`。
 *
 * @param {？function} callback更新完成后调用。
 * @最后
 * @protected
 * /
Component.prototype.forceUpdate = function（callback）{
  this.updater.enqueueForceUpdate（this，callback，'forceUpdate'）;
};

/ **
 *弃用的API。这些API曾经存在于经典的React类中，但从那时起
 *我们想弃用它们，我们不打算将它们移到此处
 *现代基础。相反，我们定义一个getter，它会在访问时发出警告。
 * /
{
  var deprecatedAPIs = {
    isMounted：['isMounted'，'相反，请务必清除'+'componentWillUnmount中的订阅和待处理请求，以防止内存泄漏。']，
    replaceState：['replaceState'，'重构您的代码以使用setState（参见'+'https://github.com/facebook/react/issues/3236）。']
  };
  var defineDeprecationWarning = function（methodName，info）{
    Object.defineProperty（Component.prototype，methodName，{
      get：function（）{
        lowPriorityWarning $ 1（false，'％s（...）在纯JavaScript React类中不推荐使用。％s'，info [0]，info [1]）;
        返回undefined;
      }
    }）;
  };
  for（已弃用的API中的var fnName）{
    if（deprecatedAPIs.hasOwnProperty（fnName））{
      defineDeprecationWarning（fnName，deprecatedAPIs [fnName]）;
    }
  }
}

function ComponentDummy（）{}
ComponentDummy.prototype = Component.prototype;

/ **
 *具有sCU默认浅等式检查的便捷组件。
 * /
function PureComponent（props，context，updater）{
  this.props =道具;
  this.context = context;
  //如果一个组件有字符串引用，我们稍后会分配一个不同的对象。
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy（）;
pureComponentPrototype.constructor = PureComponent;
//为这些方法避免额外的原型跳转。
objectAssign（pureComponentPrototype，Component.prototype）;
pureComponentPrototype.isPureReactComponent = true;

//具有单个可变值的不可变对象
function createRef（）{
  var refObject = {
    current：null
  };
  {
    Object.seal（refObject）;
  }
  return refObject;
}

var enableSchedulerDebugging = false;

/ * eslint-disable no-var * /

// TODO：使用符号？
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

//最大31位整数。32位系统的V8中的最大整数大小。
// Math.pow（2,30） -  1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

//马上出局
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
//最终超时
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
//永远不要超时
var IDLE_PRIORITY = maxSigned31BitInt;

//回调存储为循环的双向链表。
var firstCallbackNode = null;

var currentDidTimeout = false;
//暂停调度程序对调试很有用。
var isSchedulerPaused = false;

var currentPriorityLevel = NormalPriority;
var currentEventStartTime = -1;
var currentExpirationTime = -1;

//这是在执行回调时设置的，以防止重新进入。
var isExecutingCallback = false;

var isHostCallbackScheduled = false;

var hasNativePerformanceNow = typeof performance ==='object'&& typeof performance.now ==='function';

function ensureHostCallbackIsScheduled（）{
  if（isExecutingCallback）{
    //不要安排工作; 等到下一次我们屈服。
    返回;
  }
  //使用列表中最早到期的时间安排主机回调。
  var expirationTime = firstCallbackNode.expirationTime;
  if（！isHostCallbackScheduled）{
    isHostCallbackScheduled = true;
  } else {
    //取消现有的主机回调。
    cancelHostCallback（）;
  }
  requestHostCallback（flushWork，expirationTime）;
}

function flushFirstCallback（）{
  var flushedNode = firstCallbackNode;

  //在调用回调之前从列表中删除节点。那样的
  //即使回调引发，列表也处于一致状态。
  var next = firstCallbackNode.next;
  if（firstCallbackNode === next）{
    //这是列表中的最后一个回调。
    firstCallbackNode = null;
    next = null;
  } else {
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }

  flushedNode.next = flushedNode.previous = null;

  //现在调用回调是安全的。
  var callback = flushedNode.callback;
  var expirationTime = flushedNode.expirationTime;
  var priorityLevel = flushedNode.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel;
  var previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = priorityLevel;
  currentExpirationTime = expirationTime;
  var continuationCallback;
  尝试{
    continuationCallback = callback（）;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentExpirationTime = previousExpirationTime;
  }

  //回调可能会返回延续。应该安排继续
  //具有与刚完成的回调相同的优先级和到期时间。
  if（typeof continuationCallback ==='function'）{
    var continuationNode = {
      回调：continuationCallback，
      priorityLevel：priorityLevel，
      expirationTime：expirationTime，
      下一个：null，
      上一个：null
    };

    //将新回调插入列表，按其到期排序。这是
    //几乎与`scheduleCallback`中的代码相同，但回调除外
    //在*等于到期的回调之前插入到列表*中
    //之后
    if（firstCallbackNode === null）{
      //这是列表中的第一个回调。
      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
    } else {
      var nextAfterContinuation = null;
      var node = firstCallbackNode;
      做{
        if（node.expirationTime> = expirationTime）{
          //此回调在延续时或之后到期。我们将插入
          //此回调前的延续*
          nextAfterContinuation = node;
          打破;
        }
        node = node.next;
      } while（node！== firstCallbackNode）;

      if（nextAfterContinuation === null）{
        //找不到相同或更低优先级的回调，这意味着新的回调
        //回调是列表中优先级最低的回调。
        nextAfterContinuation = firstCallbackNode;
      } else if（nextAfterContinuation === firstCallbackNode）{
        //新回调是列表中优先级最高的回调。
        firstCallbackNode = continuationNode;
        ensureHostCallbackIsScheduled（）;
      }

      var previous = nextAfterContinuation.previous;
      previous.next = nextAfterContinuation.previous = continuationNode;
      continuationNode.next = nextAfterContinuation;
      continuationNode.previous = previous;
    }
  }
}

function flushImmediateWork（）{
  如果（
  //确认我们退出了最外面的事件处理程序
  currentEventStartTime === -1 && firstCallbackNode！== null && firstCallbackNode.priorityLevel === ImmediatePriority）{
    isExecutingCallback = true;
    尝试{
      做{
        flushFirstCallback（）;
      而（
      //继续刷新，直到没有更多的立即回调
      firstCallbackNode！== null && firstCallbackNode.priorityLevel === ImmediatePriority）;
    } finally {
      isExecutingCallback = false;
      if（firstCallbackNode！== null）{
        //还有工作要做 请求另一个回调。
        ensureHostCallbackIsScheduled（）;
      } else {
        isHostCallbackScheduled = false;
      }
    }
  }
}

function flushWork（didTimeout）{
  //如果我们当前暂停，请立即退出

  if（enableSchedulerDebugging && isSchedulerPaused）{
    返回;
  }

  isExecutingCallback = true;
  var previousDidTimeout = currentDidTimeout;
  currentDidTimeout = didTimeout;
  尝试{
    if（didTimeout）{
      //刷新所有过期的回调而不屈服。
      while（firstCallbackNode！== null &&！（enableSchedulerDebugging && isSchedulerPaused））{
        // TODO Wrap in feature flag
        //读取当前时间。刷新所有到期的回调或
        //早于那个时间。然后再次读取当前时间并重复。
        //优化尽可能少的performance.now调用。
        var currentTime = getCurrentTime（）;
        if（firstCallbackNode.expirationTime <= currentTime）{
          做{
            flushFirstCallback（）;
          } while（firstCallbackNode！== null && firstCallbackNode.expirationTime <= currentTime &&！（enableSchedulerDebugging && isSchedulerPaused））;
          继续;
        }
        打破;
      }
    } else {
      //继续刷新回调，直到帧中的时间不足为止。
      if（firstCallbackNode！== null）{
        做{
          if（enableSchedulerDebugging && isSchedulerPaused）{
            打破;
          }
          flushFirstCallback（）;
        } while（firstCallbackNode！== null &&！shouldYieldToHost（））;
      }
    }
  } finally {
    isExecutingCallback = false;
    currentDidTimeout = previousDidTimeout;
    if（firstCallbackNode！== null）{
      //还有工作要做 请求另一个回调。
      ensureHostCallbackIsScheduled（）;
    } else {
      isHostCallbackScheduled = false;
    }
    //在退出之前，清除已安排的所有即时工作。
    flushImmediateWork（）;
  }
}

function unstable_runWithPriority（priorityLevel，eventHandler）{
  switch（priorityLevel）{
    case ImmediatePriority：
    case UserBlockingPriority：
    case NormalPriority：
    case LowPriority：
    case IdlePriority：
      打破;
    默认：
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = getCurrentTime（）;

  尝试{
    return eventHandler（）;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    //在退出之前，清除已安排的所有即时工作。
    flushImmediateWork（）;
  }
}

function unstable_next（eventHandler）{
  var priorityLevel = void 0;
  switch（currentPriorityLevel）{
    case ImmediatePriority：
    case UserBlockingPriority：
    case NormalPriority：
      //降低到正常优先级
      priorityLevel = NormalPriority;
      打破;
    默认：
      //低于正常优先级的任何内容都应保持当前级别。
      priorityLevel = currentPriorityLevel;
      打破;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = getCurrentTime（）;

  尝试{
    return eventHandler（）;
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    //在退出之前，清除已安排的所有即时工作。
    flushImmediateWork（）;
  }
}

function unstable_wrapCallback（callback）{
  var parentPriorityLevel = currentPriorityLevel;
  return function（）{
    //这是runWithPriority的一个分支，内联性能。
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = getCurrentTime（）;

    尝试{
      return callback.apply（this，arguments）;
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;
      flushImmediateWork（）;
    }
  };
}

function unstable_scheduleCallback（callback，deprecated_options）{
  var startTime = currentEventStartTime！== -1？currentEventStartTime：getCurrentTime（）;

  var expirationTime;
  if（typeof deprecated_options ==='object'&& deprecated_options！== null && typeof deprecated_options.timeout ==='number'）{
    // FIXME：一旦我们从React提升到期时间，就删除这个分支。
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    switch（currentPriorityLevel）{
      case ImmediatePriority：
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        打破;
      case UserBlockingPriority：
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        打破;
      case IdlePriority：
        expirationTime = startTime + IDLE_PRIORITY;
        打破;
      case LowPriority：
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        打破;
      case NormalPriority：
      默认：
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }

  var newNode = {
    回调：回调，
    priorityLevel：currentPriorityLevel，
    expirationTime：expirationTime，
    下一个：null，
    上一个：null
  };

  //将新回调插入列表，然后按到期先排序
  //通过插入 所以新的回调插入任何其他回调
  //等于到期。
  if（firstCallbackNode === null）{
    //这是列表中的第一个回调。
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    ensureHostCallbackIsScheduled（）;
  } else {
    var next = null;
    var node = firstCallbackNode;
    做{
      if（node.expirationTime> expirationTime）{
        //新的回调在此之前到期。
        next = node;
        打破;
      }
      node = node.next;
    } while（node！== firstCallbackNode）;

    if（next === null）{
      //找不到稍后过期的回调，这意味着新的回调
      //回调在列表中有最新的到期日期。
      next = firstCallbackNode;
    } else if（next === firstCallbackNode）{
      //新回调在整个列表中的最早到期。
      firstCallbackNode = newNode;
      ensureHostCallbackIsScheduled（）;
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}

function unstable_pauseExecution（）{
  isSchedulerPaused = true;
}

function unstable_continueExecution（）{
  isSchedulerPaused = false;
  if（firstCallbackNode！== null）{
    ensureHostCallbackIsScheduled（）;
  }
}

function unstable_getFirstCallbackNode（）{
  return firstCallbackNode;
}

function unstable_cancelCallback（callbackNode）{
  var next = callbackNode.next;
  if（next === null）{
    //已经取消了
    返回;
  }

  if（next === callbackNode）{
    //这是唯一的预定回调。清除列表。
    firstCallbackNode = null;
  } else {
    //从列表中的位置删除回调。
    if（callbackNode === firstCallbackNode）{
      firstCallbackNode = next;
    }
    var previous = callbackNode.previous;
    previous.next = next;
    next.previous = previous;
  }

  callbackNode.next = callbackNode.previous = null;
}

function unstable_getCurrentPriorityLevel（）{
  return currentPriorityLevel;
}

function unstable_shouldYield（）{
  return！currentDidTimeout &&（firstCallbackNode！== null && firstCallbackNode.expirationTime <currentExpirationTime || shouldYieldToHost（））;
}

//剩下的代码本质上是requestIdleCallback的polyfill。它
//通过调度requestAnimationFrame来工作，存储开始的时间
//框架，然后安排postMessage，它在绘制后进行调度。
//在postMessage处理程序中，尽可能多地工作，直到时间+帧
//率。通过将空闲呼叫分成单独的事件，我们确保这一点
//布局，绘画和其他浏览器工作将根据可用时间计算。
//动态调整帧速率。

//我们捕获对任何全局的本地引用，以防它在之后被填充
//最初评估此模块。我们想要使用
//一致的实施。
var localDate = Date;

//如果是组件，这个初始化代码甚至可以在服务器环境中运行
//只需导入ReactDOM（例如，用于findDOMNode）。有些环境可能没有
//有setTimeout或clearTimeout。但是，我们始终期望它们被定义
//在客户端上。https://github.com/facebook/react/pull/13088
var localSetTimeout = typeof setTimeout ==='function'？setTimeout：undefined;
var localClearTimeout = typeof clearTimeout ==='function'？clearTimeout：undefined;

//我们不希望这些中的任何一个被定义，但我们会出错
//稍后如果客户端丢失了
var localRequestAnimationFrame = typeof requestAnimationFrame ==='function'？requestAnimationFrame：undefined;
var localCancelAnimationFrame = typeof cancelAnimationFrame ==='function'？cancelAnimationFrame：undefined;

var getCurrentTime;

//当选项卡在后台时，requestAnimationFrame不会运行。如果
//我们是背景，我们更喜欢这项工作发生在页面上
//继续在后台加载。所以我们也将'setTimeout'安排为
//一个后备。
// TODO：对于后台工作需要更好的启发式方法。
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function（callback）{
  //安排rAF和setTimeout
  rAFID = localRequestAnimationFrame（function（timestamp）{
    //取消setTimeout
    localClearTimeout（rAFTimeoutID）;
    回调（时间戳）;
  }）;
  rAFTimeoutID = localSetTimeout（function（）{
    //取消requestAnimationFrame
    localCancelAnimationFrame（rAFID）;
    回调（getCurrentTime（））;
  }，ANIMATION_FRAME_TIMEOUT）;
};

if（hasNativePerformanceNow）{
  var Performance = performance;
  getCurrentTime = function（）{
    return Performance.now（）;
  };
} else {
  getCurrentTime = function（）{
    return localDate.now（）;
  };
}

var requestHostCallback;
var cancelHostCallback;
var shouldYieldToHost;

var globalValue = null;
if（typeof window！=='undefined'）{
  globalValue = window;
} else if（typeof global！=='undefined'）{
  globalValue = global;
}

if（globalValue && globalValue._schedMock）{
  //动态注入，仅用于测试目的。
  var globalImpl = globalValue._schedMock;
  requestHostCallback = globalImpl [0];
  cancelHostCallback = globalImpl [1];
  shouldYieldToHost = globalImpl [2];
  getCurrentTime = globalImpl [3];
如果（
//如果Scheduler在非DOM环境中运行，它就会变回天真
//使用setTimeout实现。
typeof window ==='undefined'||
//检查是否支持MessageChannel。
typeof MessageChannel！=='function'）{
  //如果意外地在非浏览器环境中导入，例如JavaScriptCore，
  //回归到一个天真的实现。
  var _callback = null;
  var _flushCallback = function（didTimeout）{
    if（_callback！== null）{
      尝试{
        _callback（didTimeout）;
      } finally {
        _callback = null;
      }
    }
  };
  requestHostCallback = function（cb，ms）{
    if（_callback！== null）{
      //防止重新入侵
      setTimeout（requestHostCallback，0，cb）;
    } else {
      _callback = cb;
      setTimeout（_flushCallback，0，false）;
    }
  };
  cancelHostCallback = function（）{
    _callback = null;
  };
  shouldYieldToHost = function（）{
    返回false;
  };
} else {
  if（typeof console！=='undefined'）{
    // TODO：删除fb.me链接
    if（typeof localRequestAnimationFrame！=='function'）{
      console.error（“此浏览器不支持requestAnimationFrame。”+'确保在旧浏览器中加载'+'polyfill。https://fb.me/react-polyfills'）;
    }
    if（typeof localCancelAnimationFrame！=='function'）{
      console.error（“此浏览器不支持cancelAnimationFrame。”+'确保在旧浏览器中加载'+'polyfill。https://fb.me/react-polyfills'）;
    }
  }

  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  //我们假设我们以30fps运行，然后进行启发式跟踪
  //如果我们获得更频繁的动画，//会将此值调整为更快的fps
  //帧
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function（）{
    return frameDeadline <= getCurrentTime（）;
  };

  //我们使用postMessage技巧将空闲工作推迟到重绘之后。
  var channel = new MessageChannel（）;
  var port = channel.port2;
  channel.port1.onmessage = function（event）{
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = getCurrentTime（）;

    var didTimeout = false;
    if（frameDeadline  -  currentTime <= 0）{
      //这个空闲时期没有时间了。检查回调是否有
      //超时以及是否已超出。
      if（prevTimeoutTime！== -1 && prevTimeoutTime <= currentTime）{
        //超时超时 即使没有，也要调用回调
        // 剩下的时间。
        didTimeout = true;
      } else {
        //没有超时
        if（！isAnimationFrameScheduled）{
          //安排另一个动画回调，以便我们稍后重试。
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout（animationTick）;
        }
        //退出而不调用回调。
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        返回;
      }
    }

    if（prevScheduledCallback！== null）{
      isFlushingHostCallback = true;
      尝试{
        prevScheduledCallback（didTimeout）;
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function（rafTime）{
    if（scheduledHostCallback！== null）{
      //急切地安排在开头的下一个动画回调
      //框架 如果调度程序队列在帧的末尾不为空，则为空
      //将继续在该回调中刷新。如果队列*为*空，
      //然后它会立即退出。在开头发布回调
      // frame确保它在尽可能早的帧内被触发。要是我们
      //等到帧结束后发布回调，我们冒险了
      //浏览器跳过一个帧而不是在帧之前触发回调
      // 之后。
      requestAnimationFrameWithTimeout（animationTick）;
    } else {
      //没有待处理的工作。出口。
      isAnimationFrameScheduled = false;
      返回;
    }

    var nextFrameTime = rafTime  -  frameDeadline + activeFrameTime;
    if（nextFrameTime <activeFrameTime && previousFrameTime <activeFrameTime）{
      if（nextFrameTime <8）{
        //防御性编码 我们不支持比120hz更高的帧速率。
        //如果计算的帧时间低于8，则可能是错误。
        nextFrameTime = 8;
      }
      //如果一帧变长，那么下一帧可能很短以赶上。
      //如果两个帧连续短，那么这表明我们
      //实际上帧速率高于我们目前优化的帧速率。
      //我们相应地动态调整启发式。例如，如果我们是
      //在120hz显示屏或90hz VR显示屏上运行。
      //取两个中的最大值，以防其中一个因异常而异常
      //错过了框架截止日期。
      activeFrameTime = nextFrameTime <previousFrameTime？previousFrameTime：nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if（！isMessageEventScheduled）{
      isMessageEventScheduled = true;
      port.postMessage（未定义）;
    }
  };

  requestHostCallback = function（callback，absoluteTimeout）{
    scheduledHostCallback =回调;
    timeoutTime = absoluteTimeout;
    if（isFlushingHostCallback || absoluteTimeout <0）{
      //不要等待下一帧。在新活动中尽快继续工作。
      port.postMessage（未定义）;
    } else if（！isAnimationFrameScheduled）{
      //如果rAF尚未安排一个，我们需要安排一个框架。
      // TODO：如果这个rAF没有实现，因为浏览器会限制，我们
      //可能还想让setTimeout触发rIC作为备份来确保
      //我们一直在做工作
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout（animationTick）;
    }
  };

  cancelHostCallback = function（）{
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
}

//帮助识别开始阶段生命周期钩子和setState reducer中的副作用：


//在某些情况下，StrictMode也应该双重渲染生命周期。
//这可能会让考试感到困惑，
//这对于生产中的性能来说可能是坏事。
//此功能标志可用于控制行为：


//为了保留调试器的“暂停捕获的异常”行为，我们
//在invokeGuardedCallback中重放失败组件的开始阶段。


//警告已弃用，异步不安全的生命周期; 与RFC＃6有关：


//为Profiler子树收集高级时序度量标准。


//跟踪哪些交互触发每个提交。
var enableSchedulerTracing = true;

//仅在www版本中使用。
 // TODO：是吗？这可能只是假的。

//仅在www版本中使用。


//仅在www版本中使用。


// React Fire：阻止值和已检查属性同步
//及其相关的DOM属性


//在即将发布的16.7版本中，这些API将不再“不稳定”，
//使用标志控制此行为以同时支持16.6次发布。
var enableStableConcurrentModeAPIs = false;

var DEFAULT_THREAD_ID = 0;

//用于生成唯一ID的计数器。
var interactionIDCounter = 0;
var threadIDCounter = 0;

//当前跟踪的交互集。
//互动“堆叠” - 
//表示新跟踪的交互被附加到先前活动的集合。
//当交互超出范围时，将恢复先前的集合（如果有）。
var interactionsRef = null;

//在交互开始和结束时通知的监听器。
var subscriberRef = null;

if（enableSchedulerTracing）{
  interactionsRef = {
    当前：新集（）
  };
  subscriberRef = {
    current：null
  };
}

function unstable_clear（callback）{
  if（！enableSchedulerTracing）{
    return callback（）;
  }

  var prevInteractions = interactionsRef.current;
  interactionsRef.current = new Set（）;

  尝试{
    return callback（）;
  } finally {
    interactionsRef.current = prevInteractions;
  }
}

function unstable_getCurrent（）{
  if（！enableSchedulerTracing）{
    return null;
  } else {
    return interactionsRef.current;
  }
}

function unstable_getThreadID（）{
  return ++ threadIDCounter;
}

function unstable_trace（name，timestamp，callback）{
  var threadID = arguments.length> 3 && arguments [3]！== undefined？arguments [3]：DEFAULT_THREAD_ID;

  if（！enableSchedulerTracing）{
    return callback（）;
  }

  var interaction = {
    __count：1，
    id：interactionIDCounter ++，
    名称：名称，
    时间戳：时间戳
  };

  var prevInteractions = interactionsRef.current;

  //跟踪的交互应该堆叠/累积。
  //为此，克隆当前的交互。
  //完成后将恢复上一组。
  var interaction = new Set（prevInteractions）;
  interactions.add（相互作用）;
  interactRef.current = interaction;

  var subscriber = subscriberRef.current;
  var returnValue = void 0;

  尝试{
    if（subscriber！== null）{
      subscriber.onInteractionTraced（相互作用）;
    }
  } finally {
    尝试{
      if（subscriber！== null）{
        subscriber.onWorkStarted（interaction，threadID）;
      }
    } finally {
      尝试{
        returnValue = callback（）;
      } finally {
        interactionsRef.current = prevInteractions;

        尝试{
          if（subscriber！== null）{
            subscriber.onWorkStopped（interaction，threadID）;
          }
        } finally {
          相互作用.__ count--;

          //如果没有为此交互安排异步工作，
          //通知订阅者已完成。
          if（subscriber！== null && interaction .__ count === 0）{
            subscriber.onInteractionScheduledWorkCompleted（相互作用）;
          }
        }
      }
    }
  }

  return returnValue;
}

function unstable_wrap（callback）{
  var threadID = arguments.length> 1 && arguments [1]！== undefined？arguments [1]：DEFAULT_THREAD_ID;

  if（！enableSchedulerTracing）{
    返回回调;
  }

  var wrappedInteractions = interactionsRef.current;

  var subscriber = subscriberRef.current;
  if（subscriber！== null）{
    subscriber.onWorkScheduled（wrappedInteractions，threadID）;
  }

  //更新当前交互的待处理异步工作计数。
  //在发生错误时调用订阅者后更新。
  wrappedInteractions.forEach（function（interaction）{
    相互作用.__计数++;
  }）;

  var hasRun = false;

  function wrapped（）{
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = wrappedInteractions;

    subscriber = subscriberRef.current;

    尝试{
      var returnValue = void 0;

      尝试{
        if（subscriber！== null）{
          subscriber.onWorkStarted（wrappedInteractions，threadID）;
        }
      } finally {
        尝试{
          returnValue = callback.apply（undefined，arguments）;
        } finally {
          interactionsRef.current = prevInteractions;

          if（subscriber！== null）{
            subscriber.onWorkStopped（wrappedInteractions，threadID）;
          }
        }
      }

      return returnValue;
    } finally {
      if（！hasRun）{
        //我们只希望包装函数执行一次，
        //但如果它被执行不止一次 - 
        //只减少未完成的交互计数一次。
        hasRun = true;

        //为所有包装的交互更新挂起的异步计数。
        //如果这是其中任何一个的最后一次计划异步工作，
        //将它们标记为已完成
        wrappedInteractions.forEach（function（interaction）{
          相互作用.__ count--;

          if（subscriber！== null && interaction .__ count === 0）{
            subscriber.onInteractionScheduledWorkCompleted（相互作用）;
          }
        }）;
      }
    }
  }

  wrapped.cancel = function cancel（）{
    subscriber = subscriberRef.current;

    尝试{
      if（subscriber！== null）{
        subscriber.onWorkCanceled（wrappedInteractions，threadID）;
      }
    } finally {
      //为所有包装的交互更新挂起的异步计数。
      //如果这是其中任何一个的最后一次计划异步工作，
      //将它们标记为已完成
      wrappedInteractions.forEach（function（interaction）{
        相互作用.__ count--;

        if（subscriber && interaction .__ count === 0）{
          subscriber.onInteractionScheduledWorkCompleted（相互作用）;
        }
      }）;
    }
  };

  回归包裹;
}

var subscribers = null;
if（enableSchedulerTracing）{
  subscribers = new Set（）;
}

function unstable_subscribe（subscriber）{
  if（enableSchedulerTracing）{
    subscribers.add（订户）;

    if（subscribers.size === 1）{
      subscriberRef.current = {
        onInteractionScheduledWorkCompleted：onInteractionScheduledWorkCompleted，
        onInteractionTraced：onInteractionTraced，
        onWorkCanceled：onWorkCanceled，
        onWorkScheduled：onWorkScheduled，
        onWorkStarted：onWorkStarted，
        onWorkStopped：onWorkStopped
      };
    }
  }
}

function unstable_unsubscribe（subscriber）{
  if（enableSchedulerTracing）{
    subscribers.delete（订户）;

    if（subscribers.size === 0）{
      subscriberRef.current = null;
    }
  }
}

function onInteractionTraced（interaction）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onInteractionTraced（相互作用）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

function onInteractionScheduledWorkCompleted（interaction）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onInteractionScheduledWorkCompleted（相互作用）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

function onWorkScheduled（interaction，threadID）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onWorkScheduled（interaction，threadID）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

function onWorkStarted（interaction，threadID）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onWorkStarted（interaction，threadID）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

function onWorkStopped（interaction，threadID）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onWorkStopped（interaction，threadID）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

function onWorkCanceled（interaction，threadID）{
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach（function（subscriber）{
    尝试{
      subscriber.onWorkCanceled（interaction，threadID）;
    } catch（error）{
      if（！didCatchError）{
        didCatchError = true;
        caughtError =错误;
      }
    }
  }）;

  if（didCatchError）{
    throw caughtError;
  }
}

/ **
 *跟踪当前的调度员。
 * /
var ReactCurrentDispatcher = {
  / **
   * @internal
   * @type {ReactComponent}
   * /
  current：null
};

/ **
 *跟踪当前所有者。
 *
 *当前所有者是应该拥有任何组件的组件
 *目前正在建设中。
 * /
var ReactCurrentOwner = {
  / **
   * @internal
   * @type {ReactComponent}
   * /
  current：null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function（name，source，ownerName）{
  var sourceInfo ='';
  if（source）{
    var path = source.fileName;
    var fileName = path.replace（BEFORE_SLASH_RE，''）;
    {
      //在DEV中，包含常见特例的代码：
      //更喜欢“folder / index.js”而不仅仅是“index.js”。
      if（/^index\./.test(fileName））{
        var match = path.match（BEFORE_SLASH_RE）;
        if（match）{
          var pathBeforeSlash = match [1];
          if（pathBeforeSlash）{
            var folderName = pathBeforeSlash.replace（BEFORE_SLASH_RE，''）;
            fileName = folderName +'/'+ fileName;
          }
        }
      }
    }
    sourceInfo ='（at'+ fileName +'：'+ source.lineNumber +'）';
  } else if（ownerName）{
    sourceInfo ='（由'+ ownerName +'创建）';
  }
  返回'\ n in'+（name ||'Unknown'）+ sourceInfo;
};

var Resolved = 1;


function refineResolvedLazyComponent（lazyComponent）{
  return lazyComponent._status ===已解决？lazyComponent._result：null;
}

function getWrappedName（outerType，innerType，wrapperName）{
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || （functionName！==''？wrapperName +'（'+ functionName +'）'：wrapperName）;
}

function getComponentName（type）{
  if（type == null）{
    //主机根，文本节点或只是无效类型。
    return null;
  }
  {
    if（typeof type.tag ==='number'）{
      warningWithoutStack $ 1（false，'在getComponentName（）中收到一个意外的对象。'+'这可能是React中的一个错误。请提出问题。'）;
    }
  }
  if（typeof type ==='function'）{
    return type.displayName || type.name || 空值;
  }
  if（typeof type ==='string'）{
    返回类型;
  }
  开关（类型）{
    案例REACT_CONCURRENT_MODE_TYPE：
      返回'ConcurrentMode';
    案例REACT_FRAGMENT_TYPE：
      返回'片段';
    案例REACT_PORTAL_TYPE：
      返回'门户';
    案例REACT_PROFILER_TYPE：
      返回'Profiler';
    案例REACT_STRICT_MODE_TYPE：
      返回'StrictMode';
    案例REACT_SUSPENSE_TYPE：
      返回'悬念';
  }
  if（typeof type ==='object'）{
    switch（类型。$$ typeof）{
      案例REACT_CONTEXT_TYPE：
        返回'Context.Consumer';
      案例REACT_PROVIDER_TYPE：
        返回'Context.Provider';
      案例REACT_FORWARD_REF_TYPE：
        return getWrappedName（type，type.render，'ForwardRef'）;
      案例REACT_MEMO_TYPE：
        return getComponentName（type.type）;
      案例REACT_LAZY_TYPE：
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent（thenable）;
          if（resolvedThenable）{
            return getComponentName（resolvedThenable）;
          }
        }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentValidatingElement = null;

function setCurrentlyValidatingElement（element）{
  {
    CurrentlyValidatingElement = element;
  }
}

{
  //当前渲染器注入的堆栈实现。
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function（）{
    var stack ='';

    //在验证元素时添加额外的顶部框架
    if（currentlyValidatingElement）{
      var name = getComponentName（CurrentlyValidatingElement.type）;
      var owner = currentValidatingElement._owner;
      stack + = describeComponentFrame（name，CurrentlyValidatingElement._source，owner && getComponentName（owner.type））;
    }

    //委派给注入渲染器的特定实现
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if（impl）{
      stack + = impl（）|| '';
    }

    返回堆栈;
  };
}

var ReactSharedInternals = {
  ReactCurrentDispatcher：ReactCurrentDispatcher，
  ReactCurrentOwner：ReactCurrentOwner，
  //由渲染器使用以避免在UMD包中捆绑对象分配两次：
  assign：objectAssign
};

{
  //重新导出UMD包的计划API。
  //这可以避免在次要更新中引入对新UMD全局的依赖，
  //因为那将是一个重大变化（例如对于所有现有的CodeSandbox）。
  //只有UMD捆绑包才需要重新导出;
  // CJS包使用共享的NPM包。
  objectAssign（ReactSharedInternals，{
    调度程序：{
      unstable_cancelCallback：unstable_cancelCallback，
      unstable_shouldYield：unstable_shouldYield，
      unstable_now：getCurrentTime，
      unstable_scheduleCallback：unstable_scheduleCallback，
      unstable_runWithPriority：unstable_runWithPriority，
      unstable_next：unstable_next，
      unstable_wrapCallback：unstable_wrapCallback，
      unstable_getFirstCallbackNode：unstable_getFirstCallbackNode，
      unstable_pauseExecution：unstable_pauseExecution，
      unstable_continueExecution：unstable_continueExecution，
      unstable_getCurrentPriorityLevel：unstable_getCurrentPriorityLevel，
      unstable_IdlePriority：IdlePriority，
      unstable_ImmediatePriority：ImmediatePriority，
      unstable_LowPriority：LowPriority，
      unstable_NormalPriority：NormalPriority，
      unstable_UserBlockingPriority：UserBlockingPriority
    }，
    SchedulerTracing：{
      __interactionsRef：interactionsRef，
      __subscriberRef：subscriberRef，
      unstable_clear：unstable_clear，
      unstable_getCurrent：unstable_getCurrent，
      unstable_getThreadID：unstable_getThreadID，
      unstable_subscribe：unstable_subscribe，
      unstable_trace：unstable_trace，
      unstable_unsubscribe：unstable_unsubscribe，
      unstable_wrap：unstable_wrap
    }
  }）;
}

{
  objectAssign（ReactSharedInternals，{
    //这些不应该包含在生产中。
    ReactDebugCurrentFrame：ReactDebugCurrentFrame，
    // Shim for React DOM 16.0.0仍在解析（但未使用）这个。
    // TODO：在React 17.0中删除。
    ReactComponentTreeHook：{}
  }）;
}

/ **
 *与不变量类似，但仅在不满足条件时才记录警告。
 *这可用于记录关键的开发环境中的问题
 *路径。删除生产环境的日志记录代码将保留
 *相同的逻辑并遵循相同的代码路径。
 * /

var warning = warningWithoutStack $ 1;

{
  warning = function（condition，format）{
    if（condition）{
      返回;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum（）;
    // eslint-disable-next-line react-internal / warning-and-invariant-args

    for（var _len = arguments.length，args = Array（_len> 2？_len  -  2：0），_ key = 2; _key <_len; _key ++）{
      args [_key  -  2] =参数[_key];
    }

    warningWithoutStack $ 1.apply（undefined，[false，format +'％s']。concat（args，[stack]））;
  };
}

var warning $ 1 =警告;

var hasOwnProperty $ 1 = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  关键：是的，
  ref：是的，
  __self：是的，
  __source：true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef（config）{
  {
    if（hasOwnProperty $ 1.call（config，'ref'））{
      var getter = Object.getOwnPropertyDescriptor（config，'ref'）。get;
      if（getter && getter.isReactWarning）{
        返回false;
      }
    }
  }
  return config.ref！== undefined;
}

function hasValidKey（config）{
  {
    if（hasOwnProperty $ 1.call（config，'key'））{
      var getter = Object.getOwnPropertyDescriptor（config，'key'）。get;
      if（getter && getter.isReactWarning）{
        返回false;
      }
    }
  }
  return config.key！== undefined;
}

function defineKeyPropWarningGetter（props，displayName）{
  var warnAboutAccessingKey = function（）{
    if（！specialPropKeyWarningShown）{
      specialPropKeyWarningShown = true;
      warningWithoutStack $ 1（false，'％s：`key`不是prop。尝试访问它会导致返回'undefined'中的'+'。如果你需要在子组件中访问相同的'+'值，你应该把它作为一个不同的'+'道具传递给它。（https://fb.me/react-special-props）'，displayName）;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty（props，'key'，{
    get：warnAboutAccessingKey，
    可配置：true
  }）;
}

function defineRefPropWarningGetter（props，displayName）{
  var warnAboutAccessingRef = function（）{
    if（！specialPropRefWarningShown）{
      specialPropRefWarningShown = true;
      warningWithoutStack $ 1（false，'％s：`ref`不是prop。尝试访问它会导致'undefined'返回'+'。如果你需要在子组件中访问相同的'+'值，你应该把它作为一个不同的'+'道具传递给它。（https://fb.me/react-special-props）'，displayName）;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty（props，'ref'，{
    get：warnAboutAccessingRef，
    可配置：true
  }）;
}

/ **
 *工厂方法创建一个新的React元素。这不再坚持
 *类模式，所以不要用new来调用它。此外，没有检查的实例
 * 将工作。而是针对Symbol.for（'react.element'）测试$$ typeof字段以进行检查
 *如果有什么东西是React元素。
 *
 * @param {*}类型
 * @param {*}键
 * @param {string | object} ref
 * @param {*} self A * temporary * helper用于检测`this`所在的位置
 *当调用React.createElement时，与`owner`不同，这样我们就可以了
 *可以警告。我们想要摆脱所有者并用箭头替换字符串`ref`s
 *功能，只要`this`和所有者相同，就没有
 *改变行为。
 * @param {*} source一个注释对象（由转换器或其他方式添加）
 *表示文件名，行号和/或其他信息。
 * @param {*}所有者
 * @param {*}道具
 * @internal
 * /
var ReactElement = function（type，key，ref，self，source，owner，props）{
  var element = {
    //此标记允许我们将其唯一标识为React元素
    $$ typeof：REACT_ELEMENT_TYPE，

    //属于元素的内置属性
    类型：类型，
    钥匙：钥匙，
    ref：ref，
    道具：道具，

    //记录负责创建此元素的组件。
    _owner：老板
  };

  {
    //验证标志目前是变异的。我们穿上它
    //一个外部后备存储，以便我们可以冻结整个对象。
    //实现后，可以用WeakMap替换它
    //常用的开发环境。
    element._store = {};

    //为了使ReactElements更容易进行测试，我们制作了
    //验证标志是不可枚举的（如果可能，应该是
    //包括我们运行测试的每个环境），所以测试框架
    //忽略它
    Object.defineProperty（element._store，'validated'，{
      可配置：false，
      可枚举的：假的，
      可写的：真的，
      值：false
    }）;
    // self和source是仅DEV的属性。
    Object.defineProperty（element，'_ self'，{
      可配置：false，
      可枚举的：假的，
      可写的：假的，
      价值：自我
    }）;
    //应该考虑在两个不同的地方创建的两个元素
    //等于测试目的，因此我们将其隐藏在枚举中。
    Object.defineProperty（element，'_ source'，{
      可配置：false，
      可枚举的：假的，
      可写的：假的，
      价值：来源
    }）;
    if（Object.freeze）{
      Object.freeze（element.props）;
      Object.freeze（元件）;
    }
  }

  返回元素;
};

/ **
 *创建并返回给定类型的新ReactElement。
 *请参阅https://reactjs.org/docs/react-api.html#createelement
 * /
function createElement（type，config，children）{
  var propName = void 0;

  //提取保留名称
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if（config！= null）{
    if（hasValidRef（config））{
      ref = config.ref;
    }
    if（hasValidKey（config））{
      key =''+ config.key;
    }

    self = config .__ self === undefined？null：config .__ self;
    source = config .__ source === undefined？null：config .__ source;
    //将剩余属性添加到新的props对象中
    for（propName in config）{
      if（hasOwnProperty $ 1.call（config，propName）&&！RESERVED_PROPS.hasOwnProperty（propName））{
        道具[propName] = config [propName];
      }
    }
  }

  //儿童可以不止一个参数，并将这些参数转移到
  //新分配的props对象
  var childrenLength = arguments.length  -  2;
  if（childrenLength === 1）{
    props.children =孩子;
  } else if（childrenLength> 1）{
    var childArray = Array（childrenLength）;
    for（var i = 0; i <childrenLength; i ++）{
      childArray [i] =参数[i + 2];
    }
    {
      if（Object.freeze）{
        Object.freeze（childArray）;
      }
    }
    props.children = childArray;
  }

  //解析默认道具
  if（type && type.defaultProps）{
    var defaultProps = type.defaultProps;
    for（defaultProps中的propName）{
      if（props [propName] === undefined）{
        道具[propName] = defaultProps [propName];
      }
    }
  }
  {
    if（key || ref）{
      var displayName = typeof type ==='function'？type.displayName || type.name || '未知'：输入;
      if（key）{
        defineKeyPropWarningGetter（props，displayName）;
      }
      if（ref）{
        defineRefPropWarningGetter（props，displayName）;
      }
    }
  }
  return ReactElement（type，key，ref，self，source，ReactCurrentOwner.current，props）;
}

/ **
 *返回一个生成给定类型的ReactElements的函数。
 *请参阅https://reactjs.org/docs/react-api.html#createfactory
 * /


function cloneAndReplaceKey（oldElement，newKey）{
  var newElement = ReactElement（oldElement.type，newKey，oldElement.ref，oldElement._self，oldElement._source，oldElement._owner，oldElement.props）;

  return newElement;
}

/ **
 *使用element作为起点克隆并返回一个新的ReactElement。
 *请参阅https://reactjs.org/docs/react-api.html#cloneelement
 * /
function cloneElement（element，config，children）{
  !!（元素=== null ||元素=== undefined）？invariant（false，'React.cloneElement（...）：参数必须是React元素，但是你传递了％s。'，element）：void 0;

  var propName = void 0;

  //复制原始道具
  var props = objectAssign（{}，element.props）;

  //提取保留名称
  var key = element.key;
  var ref = element.ref;
  //保留所有者后自我保留。
  var self = element._self;
  //源被保留，因为cloneElement不太可能被a作为目标
  //转换器，原始来源可能是一个更好的指标
  //真正的所有者
  var source = element._source;

  //将保留所有者，除非重写ref
  var owner = element._owner;

  if（config！= null）{
    if（hasValidRef（config））{
      //从父母那里偷偷地窃取裁判。
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if（hasValidKey（config））{
      key =''+ config.key;
    }

    //剩余属性覆盖现有道具
    var defaultProps = void 0;
    if（element.type && element.type.defaultProps）{
      defaultProps = element.type.defaultProps;
    }
    for（propName in config）{
      if（hasOwnProperty $ 1.call（config，propName）&&！RESERVED_PROPS.hasOwnProperty（propName））{
        if（config [propName] === undefined && defaultProps！== undefined）{
          //解析默认道具
          道具[propName] = defaultProps [propName];
        } else {
          道具[propName] = config [propName];
        }
      }
    }
  }

  //儿童可以不止一个参数，并将这些参数转移到
  //新分配的props对象
  var childrenLength = arguments.length  -  2;
  if（childrenLength === 1）{
    props.children =孩子;
  } else if（childrenLength> 1）{
    var childArray = Array（childrenLength）;
    for（var i = 0; i <childrenLength; i ++）{
      childArray [i] =参数[i + 2];
    }
    props.children = childArray;
  }

  返回ReactElement（element.type，key，ref，self，source，owner，props）;
}

/ **
 *验证对象是否为ReactElement。
 *请参阅https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {？object}对象
 * @return {boolean}如果`object`是ReactElement，则为true。
 * @最后
 * /
function isValidElement（object）{
  return typeof object ==='object'&& object！== null && object. $$ typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR ='。';
var SUBSEPARATOR ='：';

/ **
 *转义并换行，以便可以安全地用作反应
 *
 * @param {string}要转义的密钥。
 * @return {string}转义密钥。
 * /
function escape（key）{
  var escapeRegex = / [=：] / g;
  var escaperLookup = {
    '='：'= 0'，
    '：'：'= 2'
  };
  var escapedString =（''+ key）.replace（escapeRegex，function（match）{
    return escaperLookup [match];
  }）;

  return'$'+ escapedString;
}

/ **
 * TODO：测试单个子项和包含一个项目的数组是否具有相同的键
 *模式。
 * /

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = / \ / + / g;
function escapeUserProvidedKey（text）{
  return（''+ text）.replace（userProvidedKeyEscapeRegex，'$＆/'）;
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext（mapResult，keyPrefix，mapFunction，mapContext）{
  if（traverseContextPool.length）{
    var traverseContext = traverseContextPool.pop（）;
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    返回{
      结果：mapResult，
      keyPrefix：keyPrefix，
      func：mapFunction，
      context：mapContext，
      数：0
    };
  }
}

function releaseTraverseContext（traverseContext）{
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if（traverseContextPool.length <POOL_SIZE）{
    traverseContextPool.push（traverseContext）;
  }
}

/ **
 * @param {？*}儿童儿童树容器。
 * @param {！string} nameSoFar到目前为止的密钥路径的名称。
 * @param {！function} callback回调以调用每个找到的子项。
 * @param {？*} traverseContext用于在整个遍历中传递信息
 *过程。
 * @return {！number}此子树中的子项数。
 * /
function traverseAllChildrenImpl（children，nameSoFar，callback，traverseContext）{
  var type = typeof children;

  if（type ==='undefined'|| type ==='boolean'）{
    //以上所有都被认为是空的。
    children = null;
  }

  var invokeCallback = false;

  if（children === null）{
    invokeCallback = true;
  } else {
    开关（类型）{
      case'string'：
      案件编号'：
        invokeCallback = true;
        打破;
      案例'对象'：
        switch（children。$$ typeof）{
          案例REACT_ELEMENT_TYPE：
          案例REACT_PORTAL_TYPE：
            invokeCallback = true;
        }
    }
  }

  if（invokeCallback）{
    回调（traverseContext，children，
    //如果它是唯一的孩子，请将名称视为包装在数组中
    //这样如果孩子的数量增长就会保持一致。
    nameSoFar ===''？SEPARATOR + getComponentKey（children，0）：nameSoFar）;
    返回1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; //在当前子树中找到的子项数。
  var nextNamePrefix = nameSoFar ===''？分离器：nameSoFar + SUBSEPARATOR;

  if（Array.isArray（children））{
    for（var i = 0; i <children.length; i ++）{
      孩子=孩子[i];
      nextName = nextNamePrefix + getComponentKey（child，i）;
      subtreeCount + = traverseAllChildrenImpl（child，nextName，callback，traverseContext）;
    }
  } else {
    var iteratorFn = getIteratorFn（children）;
    if（typeof iteratorFn ==='function'）{
      {
        //关于将地图用作儿童的警告
        if（iteratorFn === children.entries）{
          ！didWarnAboutMaps？警告$ 1（错误，'使用地图作为子项不受支持，可能会产生'+'意外结果。将其转换为键控'+'ReactElements的序列/迭代。'）：void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call（children）;
      var step = void 0;
      var ii = 0;
      while（！（step = iterator.next（））。done）{
        child = step.value;
        nextName = nextNamePrefix + getComponentKey（child，ii ++）;
        subtreeCount + = traverseAllChildrenImpl（child，nextName，callback，traverseContext）;
      }
    } else if（type ==='object'）{
      var addendum ='';
      {
        addendum ='如果你想渲染一个孩子的集合，请改用数组'+'。+ ReactDebugCurrentFrame.getStackAddendum（）;
      }
      var childrenString =''+ children;
      不变（false，'对象无效作为React子对象（找到：％s）。％s'，childrenString ==='[对象对象]'？'对象带键{'+ Object.keys（children）.join （'，'）+'}'：childrenString，addendum）;
    }
  }

  return subtreeCount;
}

/ **
 *遍历通常被指定为“props.children”的孩子，但是
 *也可以通过属性指定：
 *
 *  - `traverseAllChildren（this.props.children，...）`
 *  - `traverseAllChildren（this.props.leftPanelChildren，...）`
 *
 *`traverseContext`是一个可选的参数，通过它传递
 *整个遍历。它可用于存储累积或其他任何东西
 *回调可能会发现相关。
 *
 * @param {？*} children子树对象。
 * @param {！function} callback在遍历每个孩子时调用。
 * @param {？*} traverseContext遍历的上下文。
 * @return {！number}此子树中的子项数。
 * /
function traverseAllChildren（children，callback，traverseContext）{
  if（children == null）{
    返回0;
  }

  return traverseAllChildrenImpl（children，''，callback，traverseContext）;
}

/ **
 *生成标识集合中组件的键字符串。
 *
 * @param {*}组件可以包含手动键的组件。
 * @param {number} index如果未提供手动密钥，则使用索引。
 * @return {string}
 * /
function getComponentKey（component，index）{
  //因为我们盲目地称之为，所以在这里进行一些类型的检查。我们想确保
  //我们不会阻止潜在的未来ES API。
  if（typeof component ==='object'&& component！== null && component.key！= null）{
    //显式键
    return escape（component.key）;
  }
  //由集合中的索引确定的隐式键
  return index.toString（36）;
}

function forEachSingleChild（bookKeeping，child，name）{
  var func = bookKeeping.func，
      context = bookKeeping.context;

  func.call（context，child，bookKeeping.count ++）;
}

/ **
 *通过通常指定为“props.children”的孩子进行迭代。
 *
 *请参阅https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 *将为每个调用提供的forEachFunc（子，索引）
 *叶儿。
 *
 * @param {？*}儿童儿童树容器。
 * @param {function（*，int）} forEachFunc
 * @param {*} forEachContext forEachContext的上下文。
 * /
function forEachChildren（children，forEachFunc，forEachContext）{
  if（children == null）{
    回归孩子;
  }
  var traverseContext = getPooledTraverseContext（null，null，forEachFunc，forEachContext）;
  traverseAllChildren（children，forEachSingleChild，traverseContext）;
  releaseTraverseContext（traverseContext）;
}

function mapSingleChildIntoContext（bookKeeping，child，childKey）{
  var result = bookKeeping.result，
      keyPrefix = bookKeeping.keyPrefix，
      func = bookKeeping.func，
      context = bookKeeping.context;


  var mappedChild = func.call（context，child，bookKeeping.count ++）;
  if（Array.isArray（mappedChild））{
    mapIntoWithKeyPrefixInternal（mappedChild，result，childKey，function（c）{
      返回c;
    }）;
  } else if（mappedChild！= null）{
    if（isValidElement（mappedChild））{
      mappedChild = cloneAndReplaceKey（mappedChild，
      //保留（映射）和旧键，如果它们不同，就像
      // traverseAllChildren过去常常将对象作为子对象
      keyPrefix +（mappedChild.key &&（！child || child.key！== mappedChild.key）？escapeUserProvidedKey（mappedChild.key）+'/'：''）+ childKey）;
    }
    result.push（mappedChild）;
  }
}

function mapIntoWithKeyPrefixInternal（children，array，prefix，func，context）{
  var escapedPrefix ='';
  if（prefix！= null）{
    escapedPrefix = escapeUserProvidedKey（前缀）+'/';
  }
  var traverseContext = getPooledTraverseContext（array，escapedPrefix，func，context）;
  traverseAllChildren（children，mapSingleChildIntoContext，traverseContext）;
  releaseTraverseContext（traverseContext）;
}

/ **
 *映射通常指定为“props.children”的孩子。
 *
 *请参阅https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 *将为每个调用提供的mapFunction（子，键，索引）
 *叶儿。
 *
 * @param {？*}儿童儿童树容器。
 * @param {function（*，int）} func map函数。
 * @param {*}上下文mapFunction的上下文。
 * @return {object}包含有序结果映射的对象。
 * /
function mapChildren（children，func，context）{
  if（children == null）{
    回归孩子;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal（children，result，null，func，context）;
  返回结果;
}

/ **
 *计算通常指定为的子项数
 *`props.children`。
 *
 *请参阅https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {？*}儿童儿童树容器。
 * @return {number}孩子的数量。
 * /
function countChildren（children）{
  return traverseAllChildren（children，function（）{
    return null;
  }， 空值）;
}

/ **
 *展平一个子对象（通常指定为`props.children`）和
 *返回一个包含适当重新键入的孩子的数组。
 *
 *请参阅https://reactjs.org/docs/react-api.html#reactchildrentoarray
 * /
function toArray（children）{
  var result = [];
  mapIntoWithKeyPrefixInternal（children，result，null，function（child）{
    回归孩子;
  }）;
  返回结果;
}

/ **
 *返回子集合中的第一个子节点并验证它
 *只是该系列中的一个孩子。
 *
 *请参阅https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 *此函数的当前实现假定一个孩子获得
 *没有包装器传递，但这个辅助函数的目的是
 *抽象出儿童的特殊结构。
 *
 * @param {？object} children子集合结构。
 * @return {ReactElement}第一个也是唯一的`ReactElement`包含在
 * 结构体。
 * /
function onlyChild（children）{
  ！isValidElement（孩子们）？不变（false，'React.Children.only期望接收一个React元素子。'）：void 0;
  回归孩子;
}

function createContext（defaultValue，calculateChangedBits）{
  if（calculateChangedBits === undefined）{
    calculateChangedBits = null;
  } else {
    {
      ！（calculateChangedBits === null || typeof calculateChangedBits ==='function'）？warningWithoutStack $ 1（false，'createContext：预期可选的第二个参数为'+'函数。而是收到：％s'，calculateChangedBits）：void 0;
    }
  }

  var context = {
    $$ typeof：REACT_CONTEXT_TYPE，
    _calculateChangedBits：calculateChangedBits，
    //作为支持多个并发渲染器的解决方法，我们进行了分类
    //某些渲染器为主要渲染器，其他渲染器为次要渲染器 我们只是期望
    //最多有两个并发渲染器：React Native（主要）和
    //面料（二级）; 反应DOM（主要）和反应ART（次要）。
    //辅助渲染器将其上下文值存储在不同的字段中。
    _currentValue：defaultValue，
    _currentValue2：defaultValue，
    //用于跟踪当前上下文的并发渲染器数量
    //在单个渲染器中支持。如并行服务器渲染。
    _threadCount：0，
    //这些是循环的
    提供者：null，
    消费者：无效
  };

  context.Provider = {
    $$ typeof：REACT_PROVIDER_TYPE，
    _context：context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    //一个单独的对象，但代理回原始上下文对象
    //向后兼容性。它有一个不同的$$类型，所以我们可以正常
    //警告Context作为Consumer的错误用法。
    var Consumer = {
      $$ typeof：REACT_CONTEXT_TYPE，
      _context：context，
      _calculateChangedBits：context._calculateChangedBits
    };
    // $ FlowFixMe：Flow抱怨没有设置值，这是故意的
    Object.defineProperties（Consumer，{
      提供者：{
        get：function（）{
          if（！hasWarnedAboutUsingConsumerProvider）{
            hasWarnedAboutUsingConsumerProvider = true;
            警告$ 1（false，'Rendering <Context.Consumer.Provider>不受支持，将在未来主要版本的'+'中删除。你的意思是渲染<Context.Provider>吗？'）;
          }
          return context.Provider;
        }，
        set：function（_Provider）{
          context.Provider = _Provider;
        }
      }，
      _当前值： {
        get：function（）{
          return context._currentValue;
        }，
        set：function（_currentValue）{
          context._currentValue = _currentValue;
        }
      }，
      _currentValue2：{
        get：function（）{
          return context._currentValue2;
        }，
        set：function（_currentValue2）{
          context._currentValue2 = _currentValue2;
        }
      }，
      _threadCount：{
        get：function（）{
          return context._threadCount;
        }，
        set：function（_threadCount）{
          context._threadCount = _threadCount;
        }
      }，
      消费者：{
        get：function（）{
          if（！hasWarnedAboutUsingNestedContextConsumers）{
            hasWarnedAboutUsingNestedContextConsumers = true;
            警告$ 1（false，'Rendering <Context.Consumer.Consumer>不受支持，将在未来的主要版本'+'中删除。你的意思是渲染<Context.Consumer>吗？'）;
          }
          回归上下文。消费者;
        }
      }
    }）;
    // $ FlowFixMe：Flow抱怨缺少属性，因为它不了解defineProperty
    context.Consumer =消费者;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  回归背景;
}

function lazy（ctor）{
  var lazyType = {
    $$ typeof：REACT_LAZY_TYPE，
    _ctor：ctor，
    // React使用这些字段来存储结果。
    _status：-1，
    _result：null
  };

  {
    //在生产中，这只会在对象上设置它。
    var defaultProps = void 0;
    var propTypes = void 0;
    Object.defineProperties（lazyType，{
      defaultProps：{
        可配置：true，
        get：function（）{
          return defaultProps;
        }，
        set：function（newDefaultProps）{
          警告$ 1（false，'React.lazy（...）：不支持将`defaultProps`分配给'+'一个惰性组件导入。指定它们定义组件'+'的位置，或者创建一个包装组件周围。'）;
          defaultProps = newDefaultProps;
          //更紧密地匹配生产行为：
          Object.defineProperty（lazyType，'defaultProps'，{
            可枚举：是的
          }）;
        }
      }，
      propTypes：{
        可配置：true，
        get：function（）{
          return propTypes;
        }，
        set：function（newPropTypes）{
          warning $ 1（false，'React.lazy（...）：不支持将'propTypes`分配给'+'一个惰性组件导入。指定它们定义组件'+'的位置，或者创建一个包装组件周围。'）;
          propTypes = newPropTypes;
          //更紧密地匹配生产行为：
          Object.defineProperty（lazyType，'propTypes'，{
            可枚举：是的
          }）;
        }
      }
    }）;
  }

  return lazyType;
}

function forwardRef（render）{
  {
    if（render！= null && render。$$ typeof === REACT_MEMO_TYPE）{
      warningWithoutStack $ 1（false，'forwardRef需要一个渲染函数，但收到一个'memo`'+'组件。而不是forwardRef（memo（...）），使用'+'memo（forwardRef（...））。'） ;
    } else if（typeof render！=='function'）{
      warningWithoutStack $ 1（false，'forwardRef需要一个渲染函数但是被赋予％s。'，render === null？'null'：typeof render）;
    } else {
      ！（
      //不要警告0个参数，因为它可能是由于使用了'arguments'对象
      render.length === 0 || render.length === 2）？warningWithoutStack $ 1（false，'forwardRef渲染函数接受两个参数：props和ref。％s'，render.length === 1？'你忘了使用ref参数吗？'：'任何其他参数都是未定义的。 '）：void 0;
    }

    if（render！= null）{
      ！（render.defaultProps == null && render.propTypes == null）？warningWithoutStack $ 1（false，'forwardRef渲染函数不支持propTypes或defaultProps。'+'你不小心传递了一个React组件吗？'）：void 0;
    }
  }

  返回{
    $$ typeof：REACT_FORWARD_REF_TYPE，
    渲染：渲染
  };
}

function isValidElementType（type）{
  return typeof type ==='string'|| typeof type ==='function'||
  //注意：如果它是polyfill，它的typeof可能不是'symbol'或'number'。
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type ==='object'&& type！== null &&（type。$$ typeof === REACT_LAZY_TYPE || type. $$ typeof === REACT_MEMO_TYPE || type. $$ typeof === REACT_PROVIDER_TYPE || type 。$$ typeof === REACT_CONTEXT_TYPE || type. $$ typeof === REACT_FORWARD_REF_TYPE）;
}

功能备忘录（类型，比较）{
  {
    if（！isValidElementType（type））{
      warningWithoutStack $ 1（false，'memo：第一个参数必须是一个组件。而不是'+'收到：％s'，type === null？'null'：typeof type）;
    }
  }
  返回{
    $$ typeof：REACT_MEMO_TYPE，
    类型：类型，
    比较：比较=== undefined？null：比较
  };
}

function resolveDispatcher（）{
  var dispatcher = ReactCurrentDispatcher.current;
  ！（调度员！== null）？invariant（false，'无效的钩子调用。钩子只能在函数组件的主体内部调用。这可能由于以下原因之一而发生：\ n1。您可能有不匹配的React版本和渲染器（例如React） DOM）\ n2。您可能违反了Hooks规则\ n3。您可能在同一个应用程序中有多个React副本\ n请访问https://fb.me/react-invalid-hook-call获取有关如何使用的提示调试并解决这个问题。'）：void 0;
  回程调度员;
}

function useContext（Context，unstable_observedBits）{
  var dispatcher = resolveDispatcher（）;
  {
    ！（unstable_observedBits === undefined）？警告$ 1（false，'useContext（）第二个参数保留用于React中的未来'+'使用。不支持传递它。'+'你传递了：％s。％s'，unstable_observedBits，typeof unstable_observedBits ==='number '&& Array.isArray（arguments [2]）？'\ n \ n你是否调用了array.map（useContext）？'+'不支持在循环内调用Hooks。'+'在https：// fb了解更多信息。 me / rules-of-hooks'：''）：void 0;

    // TODO：为无效值添加更通用的警告。
    if（Context._context！== undefined）{
      var realContext = Context._context;
      //不要进行重复数据删除，因为这会合法地导致错误
      //并且没有人应该在现有代码中使用它。
      if（realContext.Consumer === Context）{
        警告$ 1（错误，'调用useContext（Context.Consumer）不受支持，可能会导致错误，并在将来的主要版本中删除'+'。你的意思是调用useContext（Context）吗？'）;
      } else if（realContext.Provider === Context）{
        警告$ 1（false，'不支持调用useContext（Context.Provider）。'+'你的意思是调用useContext（Context）吗？'）;
      }
    }
  }
  return dispatcher.useContext（Context，unstable_observedBits）;
}

function useState（initialState）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useState（initialState）;
}

function useReducer（reducer，initialArg，init）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useReducer（reducer，initialArg，init）;
}

function useRef（initialValue）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useRef（initialValue）;
}

function useEffect（create，inputs）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useEffect（create，inputs）;
}

function useLayoutEffect（create，inputs）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useLayoutEffect（create，inputs）;
}

function useCallback（callback，inputs）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useCallback（callback，inputs）;
}

function useMemo（create，inputs）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useMemo（create，inputs）;
}

function useImperativeHandle（ref，create，inputs）{
  var dispatcher = resolveDispatcher（）;
  return dispatcher.useImperativeHandle（ref，create，inputs）;
}

function useDebugValue（value，formatterFn）{
  {
    var dispatcher = resolveDispatcher（）;
    return dispatcher.useDebugValue（value，formatterFn）;
  }
}

/ **
 *版权所有（c）2013-present，Facebook，Inc。
 *
 *此源代码根据MIT许可证获得许可
 *此源树的根​​目录中的LICENSE文件。
 * /



var ReactPropTypesSecret $ 1 ='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret $ 1;

/ **
 *版权所有（c）2013-present，Facebook，Inc。
 *
 *此源代码根据MIT许可证获得许可
 *此源树的根​​目录中的LICENSE文件。
 * /



var printWarning $ 1 = function（）{};

{
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};

  printWarning $ 1 = function（text）{
    var message ='警告：'+ text;
    if（typeof console！=='undefined'）{
      console.error（消息）;
    }
    尝试{
      // ---欢迎调试React ---
      //抛出此错误是为了方便，以便您可以使用此堆栈
      //找到导致此警告触发的调用点。
      抛出新的错误（消息）;
    } catch（x）{}
  };
}

/ **
 *断言值与类型规格匹配。
 *错误信息被记忆，只会显示一次。
 *
 * @param {object} typeSpecs ReactPropType的名称映射
 * @param {object}值需要进行类型检查的运行时值
 * @param {string}位置例如“prop”，“context”，“child context”
 * @param {string} componentName错误消息的组件名称。
 * @param {？Function} getStack返回组件堆栈。
 * @私人的
 * /
function checkPropTypes（typeSpecs，values，location，componentName，getStack）{
  {
    for（typeSpecs中的var typeSpecName）{
      if（typeSpecs.hasOwnProperty（typeSpecName））{
        变量误差;
        // Prop类型验证可能会抛出。如果他们这样做，我们不想
        //在之前没有失败的渲染阶段失败。所以我们记录下来。
        //清理完之后，我们会让他们扔掉。
        尝试{
          //这是故意被捕获的不变量。一样的
          //没有此语句的行为，除了更好的消息。
          if（typeof typeSpecs [typeSpecName]！=='function'）{
            var err =错误（
              （componentName ||'React class'）+'：'+ location +'type`'+ typeSpecName +'`无效; '+
              '它必须是一个函数，通常来自`prop-types`包，但收到`'+ typeof typeSpecs [typeSpecName] +'`。
            ）;
            err.name ='不变违规';
            扔错了;
          }
          error = typeSpecs [typeSpecName]（values，typeSpecName，componentName，location，null，ReactPropTypesSecret）;
        } catch（ex）{
          error = ex;
        }
        if（error &&！（error instanceof Error））{
          printWarning $ 1（
            （componentName ||'React class'）+'：'+的类型规范
            location +'''+ typeSpecName +'`无效; 类型检查器'+
            '函数必须返回`null`或`Error`但返回'+ typeof error +'。'+
            '你可能忘记将参数传递给类型检查器'+
            'creator（arrayOf，instanceOf，objectOf，oneOf，oneOfType和'+
            “形状都需要争论。”
          ）;

        }
        if（error instanceof Error &&！（loggedTypeFailures中的error.message））{
          //只监视一次失败，因为往往会有很多失败
          //同样的错误。
          loggedTypeFailures [error.message] = true;

          var stack = getStack？getStack（）：'';

          printWarning $ 1（
            '失败'+位置+'类型：'+ error.message +（stack！= null？stack：''）
          ）;
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

/ **
 * ReactElementValidator提供了一个元素工厂的包装器
 *验证传递给元素的道具。这是为了
 *仅在DEV中使用，可以用语言的静态类型检查器替换
 *支持它。
 * /

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum（）{
  if（ReactCurrentOwner.current）{
    var name = getComponentName（ReactCurrentOwner.current.type）;
    if（name）{
      return'\ n \ n检查`'+ name +'`的渲染方法。';
    }
  }
  返回'';
}

function getSourceInfoErrorAddendum（elementProps）{
  if（elementProps！== null && elementProps！== undefined && elementProps .__ source！== undefined）{
    var source = elementProps .__ source;
    var fileName = source.fileName.replace（/^.* [\\\/]/,''）;
    var lineNumber = source.lineNumber;
    返回'\ n \ n在'+ fileName +'检查您的代码：'+ lineNumber +'。';
  }
  返回'';
}

/ **
 *如果在子项的动态数组上没有显式设置键，则发出警告
 *对象键无效。这使我们能够跟踪孩子之间的情况
 * 更新。
 * /
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo（parentType）{
  var info = getDeclarationErrorAddendum（）;

  if（！info）{
    var parentName = typeof parentType ==='string'？parentType：parentType.displayName || parentType.name;
    if（parentName）{
      info ='\ n \ n使用<'+ parentName +'>检查顶级渲染调用。';
    }
  }
  返回信息;
}

/ **
 *如果元素没有分配显式键，则发出警告。
 *此元素位于数组中。阵列可以增长或缩小
 *重新订购。所有尚未经过验证的儿童都必须参加
 *分配了一个“密钥”属性。错误状态被缓存，因此出现警告
 *只会显示一次。
 *
 * @internal
 * @param {ReactElement} element需要密钥的元素。
 * @param {*} parentType元素的父类型。
 * /
function validateExplicitKey（element，parentType）{
  if（！element._store || element._store.validated || element.key！= null）{
    返回;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo（parentType）;
  if（ownerHasKeyUseWarning [currentComponentErrorInfo]）{
    返回;
  }
  ownerHasKeyUseWarning [currentComponentErrorInfo] = true;

  //通常当前所有者是罪犯，但如果它接受儿童作为
  //属性，它可能是孩子的负责人的创造者
  //为它指定一个键。
  var childOwner ='';
  if（element && element._owner && element._owner！== ReactCurrentOwner.current）{
    //提供最初创建此子项的组件。
    childOwner ='它从'+ getComponentName（element._owner.type）+'传递了一个孩子。';
  }

  setCurrentlyValidatingElement（元件）;
  {
    警告$ 1（错误，'列表中的每个孩子都应该有一个唯一的“密钥”道具。'+'％s％s有关详细信息，请参阅https://fb.me/react-warning-keys。'，currentComponentErrorInfo，childOwner ）;
  }
  setCurrentlyValidatingElement（NULL）;
}

/ **
 *确保每个元素都在一个静态位置传递
 *定义了显式键属性的数组，或者在对象文字中
 *有效的关键属性。
 *
 * @internal
 * @param {ReactNode}节点静态传递任何类型的子节点。
 * @param {*} parentType节点的父类型。
 * /
function validateChildKeys（node，parentType）{
  if（typeof node！=='object'）{
    返回;
  }
  if（Array.isArray（node））{
    for（var i = 0; i <node.length; i ++）{
      var child = node [i];
      if（isValidElement（child））{
        validateExplicitKey（child，parentType）;
      }
    }
  } else if（isValidElement（node））{
    //此元素已在有效位置传递。
    if（node._store）{
      node._store.validated = true;
    }
  } else if（node）{
    var iteratorFn = getIteratorFn（node）;
    if（typeof iteratorFn ==='function'）{
      //用于提供隐式键的入口迭代器，
      //但现在我们稍后会为他们打印一个单独的警告。
      if（iteratorFn！== node.entries）{
        var iterator = iteratorFn.call（node）;
        var step = void 0;
        while（！（step = iterator.next（））。done）{
          if（isValidElement（step.value））{
            validateExplicitKey（step.value，parentType）;
          }
        }
      }
    }
  }
}

/ **
 *给定一个元素，验证它的props遵循propTypes定义，
 *由类型提供。
 *
 * @param {ReactElement}元素
 * /
function validatePropTypes（element）{
  var type = element.type;
  if（type === null || type === undefined || typeof type ==='string'）{
    返回;
  }
  var name = getComponentName（type）;
  var propTypes = void 0;
  if（typeof type ==='function'）{
    propTypes = type.propTypes;
  } else if（typeof type ==='object'&&（type。$$ typeof === REACT_FORWARD_REF_TYPE ||
  //注意：备注仅在此处检查外部道具。
  //在协调程序中检查内部道具。
  类型。$$ typeof === REACT_MEMO_TYPE））{
    propTypes = type.propTypes;
  } else {
    返回;
  }
  if（propTypes）{
    setCurrentlyValidatingElement（元件）;
    checkPropTypes_1（propTypes，element.props，'prop'，name，ReactDebugCurrentFrame.getStackAddendum）;
    setCurrentlyValidatingElement（NULL）;
  } else if（type.PropTypes！== undefined &&！propTypesMisspellWarningShown）{
    propTypesMisspellWarningShown = true;
    warningWithoutStack $ 1（false，'组件％s声明`PropTypes`而不是'propTypes`。你拼错了属性赋值吗？'，name ||'Unknown'）;
  }
  if（typeof type.getDefaultProps ==='function'）{
    ！type.getDefaultProps.isReactClassApproved？warningWithoutStack $ 1（false，'getDefaultProps仅用于经典的React.createClass'+'定义。使用名为`defaultProps`的静态属性。'）：void 0;
  }
}

/ **
 *给定一个片段，验证它只能提供片段道具
 * @param {ReactElement}片段
 * /
function validateFragmentProps（fragment）{
  setCurrentlyValidatingElement（片段）;

  var keys = Object.keys（fragment.props）;
  for（var i = 0; i <keys.length; i ++）{
    var key = keys [i];
    if（key！=='children'&& key！=='key'）{
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,

  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
  React.unstable_ConcurrentMode = undefined;
  React.unstable_Profiler = undefined;
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

return react;

})));