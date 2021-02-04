import crawler
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import matplotlib.pyplot as plt
import numpy as np

title = ['beauty','dry flower','paul','Text me','Bunny','옛 사랑','Toy']
singer = ['정준일','surl','혁오','dpr live','백예린','이문세','BlockB']

def multiprocessing(func, args1, args2, workers):
    with ProcessPoolExecutor(workers) as ex:
        result_crawled = ex.map(func, args1, args2)
    return result_crawled


if __name__ == '__main__':
    multiprocessing(crawler.crawler_start, title, singer, workers=4)
    # workers = 프로세스 수